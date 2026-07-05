import { Router } from "express";
import store from "./store.js";
import { requireAuth } from "./auth.js";
import { DEFAULT_COLLECTIONS, DEFAULT_SETTINGS } from "./seed.js";

const SECTIONS = Object.keys(DEFAULT_COLLECTIONS);
const SETTING_KEYS = Object.keys(DEFAULT_SETTINGS);

const router = Router();

function validSection(req, res, next) {
  if (!SECTIONS.includes(req.params.section)) {
    return res.status(404).json({ error: `Unknown section '${req.params.section}'` });
  }
  next();
}

// Public: the whole site content in one payload.
router.get("/content", async (_req, res) => {
  const collections = {};
  for (const section of SECTIONS) collections[section] = await store.listSection(section);
  const settings = await store.getAllSettings();
  res.json({ collections, settings });
});

// ---- Collections CRUD (auth) ----
router.get("/collections/:section", validSection, async (req, res) => {
  res.json(await store.listSection(req.params.section));
});

router.post("/collections/:section", requireAuth, validSection, async (req, res) => {
  const data = req.body || {};
  const id = await store.insertItem(req.params.section, data);
  res.status(201).json({ id, ...data });
});

router.put("/collections/:section/reorder", requireAuth, validSection, async (req, res) => {
  const { ids } = req.body || {};
  if (!Array.isArray(ids)) return res.status(400).json({ error: "'ids' array is required" });
  await store.reorderSection(req.params.section, ids);
  res.json(await store.listSection(req.params.section));
});

router.put("/collections/:section/:id", requireAuth, validSection, async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  const ok = await store.updateItem(req.params.section, req.params.id, data);
  if (!ok) return res.status(404).json({ error: "Item not found" });
  res.json({ id: Number(req.params.id), ...data });
});

router.delete("/collections/:section/:id", requireAuth, validSection, async (req, res) => {
  const ok = await store.deleteItem(req.params.section, req.params.id);
  if (!ok) return res.status(404).json({ error: "Item not found" });
  res.json({ ok: true });
});

// ---- Settings (singleton sections) ----
router.get("/settings/:key", async (req, res) => {
  const data = await store.getSetting(req.params.key);
  if (!data) return res.status(404).json({ error: "Unknown settings key" });
  res.json(data);
});

router.put("/settings/:key", requireAuth, async (req, res) => {
  if (!SETTING_KEYS.includes(req.params.key)) {
    return res.status(404).json({ error: `Unknown settings key '${req.params.key}'` });
  }
  await store.putSetting(req.params.key, req.body || {});
  res.json(req.body || {});
});

// ---- Feedback ----
router.post("/feedback", async (req, res) => {
  const { name, rating, category, message } = req.body || {};
  if (!message || !String(message).trim()) return res.status(400).json({ error: "Message is required" });
  const id = await store.insertFeedback({
    name: String(name || "").slice(0, 200),
    rating: Number(rating) || null,
    category: String(category || "").slice(0, 100),
    message: String(message).slice(0, 5000),
  });
  res.status(201).json({ id });
});

router.get("/feedback", requireAuth, async (_req, res) => {
  res.json(await store.listFeedback());
});

router.delete("/feedback/:id", requireAuth, async (req, res) => {
  const ok = await store.deleteFeedback(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
