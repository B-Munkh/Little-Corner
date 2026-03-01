import React, { useEffect, useState } from "react";
import { fetchMemories, addMemory, updateMemory, deleteMemory } from "../api";
import "../App.css";

export default function Admin() {
  const [memories, setMemories] = useState([]);
  const [input, setInput] = useState("");

  const loadMemories = () => {
    fetchMemories().then(setMemories).catch(console.error);
  };

  useEffect(() => { loadMemories(); }, []);

  const handleAdd = async () => {
    if (!input) return;
    await addMemory({ content: input, createdAt: new Date() });
    setInput("");
    loadMemories();
  };

  const handleDelete = async (id) => {
    await deleteMemory(id);
    loadMemories();
  };

  return (
    <div className="admin-container">
      <div className="admin-section">
        <h2>Add Memory</h2>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter memory" />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="admin-section">
        <h2>Existing Memories</h2>
        {memories.map(mem => (
          <div key={mem.id} style={{ marginBottom: "0.5rem" }}>
            <span>{mem.content}</span>
            <button onClick={() => handleDelete(mem.id)} style={{ marginLeft: "1rem" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}