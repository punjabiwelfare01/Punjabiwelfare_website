import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import { UPLOADS_DIR } from "./paths.js";
import store from "./store.js";
import { seedIfEmpty } from "./seed.js";
import authRouter, { requireAuth } from "./auth.js";
import contentRouter from "./content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;

await store.init();
await seedIfEmpty();
console.log(`Using ${store.driver} database`);

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Uploaded images
app.use("/uploads", express.static(UPLOADS_DIR, { maxAge: "7d" }));

// Image upload (admin only)
const ALLOWED_TYPES = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" };
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const ext = ALLOWED_TYPES[file.mimetype] || path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) cb(null, true);
    else cb(new Error("Only JPEG, PNG, WebP or GIF images are allowed"));
  },
});

app.post("/api/upload", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image provided (field name: 'image')" });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

app.use("/api/auth", authRouter);
app.use("/api", contentRouter);

// Serve the built frontend in production
const distDir = path.join(__dirname, "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/(api|uploads)\/).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 400).json({ error: err.message || "Request failed" });
});

const server = app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`ERROR: port ${PORT} is already in use — another server instance is probably running.`);
    console.error("Stop it (or set PORT to a different value in .env) and try again.");
  } else {
    console.error("Server failed to start:", err.message);
  }
  process.exit(1);
});
