import crypto from "crypto";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Router } from "express";
import store from "./store.js";
import { DATA_DIR } from "./paths.js";

// JWT secret: env var wins; otherwise generate once and persist so tokens
// survive server restarts.
function loadSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const file = path.join(DATA_DIR, "jwt-secret");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, crypto.randomBytes(48).toString("hex"), { mode: 0o600 });
  }
  return fs.readFileSync(file, "utf8").trim();
}
const SECRET = loadSecret();

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Naive per-IP login rate limit: 8 attempts per 15 minutes.
const attempts = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, since: now };
  if (now - entry.since > 15 * 60 * 1000) {
    attempts.set(ip, { count: 1, since: now });
    return false;
  }
  entry.count += 1;
  attempts.set(ip, entry);
  return entry.count > 8;
}

const router = Router();

router.post("/login", async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: "Too many login attempts. Try again in 15 minutes." });
  }
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const admin =
    (await store.getAdminByEmail(String(email).trim().toLowerCase())) ||
    (await store.getAdminByEmail(String(email).trim()));
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET, { expiresIn: "12h" });
  res.json({ token, email: admin.email });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ id: req.admin.id, email: req.admin.email });
});

router.post("/change-password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required" });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters" });
  }
  const admin = await store.getAdminById(req.admin.id);
  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }
  await store.updateAdminPassword(admin.id, bcrypt.hashSync(newPassword, 10));
  res.json({ ok: true });
});

export default router;
