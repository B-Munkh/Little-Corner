const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "memories.json");

// Helper to read JSON
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const json = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(json);
};

// Helper to write JSON
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all memories
app.get("/api/memories", (req, res) => {
  const memories = readData();
  res.json(memories);
});

// POST a new memory
app.post("/api/memories", (req, res) => {
  const memories = readData();
  const newMemory = { id: Date.now().toString(), ...req.body };
  memories.push(newMemory);
  writeData(memories);
  res.status(201).json(newMemory);
});

// PUT update memory
app.put("/api/memories/:id", (req, res) => {
  const memories = readData();
  const index = memories.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  memories[index] = { id: req.params.id, ...req.body };
  writeData(memories);
  res.json(memories[index]);
});

// DELETE memory
app.delete("/api/memories/:id", (req, res) => {
  let memories = readData();
  memories = memories.filter(m => m.id !== req.params.id);
  writeData(memories);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));