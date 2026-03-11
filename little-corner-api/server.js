const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const MEMORIES_FILE = path.join(__dirname, "data", "memories.json");
const MILESTONES_FILE = path.join(__dirname, "data", "milestones.json");

// Generic helpers
const readJson = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all memories
app.get("/api/memories", (req, res) => {
  const memories = readJson(MEMORIES_FILE);
  res.json(memories);
});

// POST a new memory
app.post("/api/memories", (req, res) => {
  const memories = readJson(MEMORIES_FILE);
  const newMemory = { id: Date.now().toString(), ...req.body };
  memories.push(newMemory);
  writeJson(MEMORIES_FILE, memories);
  res.status(201).json(newMemory);
});

// PUT update memory
app.put("/api/memories/:id", (req, res) => {
  const memories = readJson(MEMORIES_FILE);
  const index = memories.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  memories[index] = { id: req.params.id, ...req.body };
  writeJson(MEMORIES_FILE, memories);
  res.json(memories[index]);
});

// DELETE memory
app.delete("/api/memories/:id", (req, res) => {
  let memories = readJson(MEMORIES_FILE);
  memories = memories.filter(m => m.id !== req.params.id);
  writeJson(MEMORIES_FILE, memories);
  res.json({ success: true });
});

// ----- Milestones endpoints -----

// GET all milestones
app.get("/api/milestones", (req, res) => {
  const milestones = readJson(MILESTONES_FILE);
  res.json(milestones);
});

// POST a new milestone
app.post("/api/milestones", (req, res) => {
  const milestones = readJson(MILESTONES_FILE);
  const newMilestone = { id: Date.now().toString(), ...req.body };
  milestones.push(newMilestone);
  writeJson(MILESTONES_FILE, milestones);
  res.status(201).json(newMilestone);
});

// PUT update milestone
app.put("/api/milestones/:id", (req, res) => {
  const milestones = readJson(MILESTONES_FILE);
  const index = milestones.findIndex((m) => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  milestones[index] = { id: req.params.id, ...req.body };
  writeJson(MILESTONES_FILE, milestones);
  res.json(milestones[index]);
});

// DELETE milestone
app.delete("/api/milestones/:id", (req, res) => {
  let milestones = readJson(MILESTONES_FILE);
  milestones = milestones.filter((m) => m.id !== req.params.id);
  writeJson(MILESTONES_FILE, milestones);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));