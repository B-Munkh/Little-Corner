import React, { useEffect, useState } from "react";
import {
  fetchMemories,
  addMemory,
  updateMemory,
  deleteMemory,
  fetchMilestones,
  addMilestone,
  updateMilestone,
  deleteMilestone,
} from "../api";
import "../App.css";

export default function Admin() {
  const [memories, setMemories] = useState([]);
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneDate, setMilestoneDate] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_CODE = "littlecorner"; // change this to your own secret string

  const loadMemories = () => {
    fetchMemories()
      .then((data) => {
        setMemories(data || []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load memories from the server.");
      });
  };

  const loadMilestones = () => {
    fetchMilestones()
      .then((data) => {
        setMilestones(data || []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load milestones from the server.");
      });
  };

  useEffect(() => {
    if (isAuthorized) {
      loadMemories();
      loadMilestones();
    }
  }, [isAuthorized]);

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    if (accessCode === ADMIN_CODE) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect access code.");
    }
  };

  const handleAdd = async () => {
    if (!memoryDescription) return;
    try {
      await addMemory({
        title: memoryTitle || undefined,
        content: memoryDescription,
        createdAt: memoryDate ? new Date(memoryDate) : new Date(),
      });
      setMemoryTitle("");
      setMemoryDate("");
      setMemoryDescription("");
      setError("");
      loadMemories();
    } catch (err) {
      console.error(err);
      setError("Could not add memory. Please check the server.");
    }
  };

  const handleEdit = async (mem) => {
    const nextTitle = window.prompt("Edit title:", mem.title || "");
    if (nextTitle == null) return;
    const nextContent = window.prompt("Edit memory:", mem.content || "");
    if (nextContent == null) return;
    try {
      await updateMemory(mem.id, {
        ...mem,
        title: nextTitle,
        content: nextContent,
      });
      setError("");
      loadMemories();
    } catch (err) {
      console.error(err);
      setError("Could not update memory.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMemory(id);
      setError("");
      loadMemories();
    } catch (err) {
      console.error(err);
      setError("Could not delete memory.");
    }
  };

  const handleAddMilestone = async () => {
    if (!milestoneTitle || !milestoneDate) return;
    try {
      await addMilestone({ title: milestoneTitle, date: milestoneDate });
      setMilestoneTitle("");
      setMilestoneDate("");
      setError("");
      loadMilestones();
    } catch (err) {
      console.error(err);
      setError("Could not add milestone.");
    }
  };

  const handleEditMilestone = async (m) => {
    const nextTitle = window.prompt("Edit title:", m.title);
    if (nextTitle == null) return;
    const nextDate = window.prompt("Edit date (YYYY-MM-DD):", m.date);
    if (nextDate == null) return;
    try {
      await updateMilestone(m.id, { ...m, title: nextTitle, date: nextDate });
      setError("");
      loadMilestones();
    } catch (err) {
      console.error(err);
      setError("Could not update milestone.");
    }
  };

  const handleDeleteMilestone = async (id) => {
    try {
      await deleteMilestone(id);
      setError("");
      loadMilestones();
    } catch (err) {
      console.error(err);
      setError("Could not delete milestone.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="admin-container">
        <div className="admin-section">
          <h2>Admin Access</h2>
          <p>Enter the shared access code to edit memories and milestones.</p>
          <form onSubmit={handleAccessSubmit} id="admin-form-container">
            <input
              type="password"
              placeholder="Access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            <button type="submit">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {error && (
        <p style={{ color: "#b44646", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      <div className="admin-section">
        <h2>Add Memory</h2>
        <div id="memory-form">
          <input
            value={memoryTitle}
            onChange={(e) => setMemoryTitle(e.target.value)}
            placeholder="Memory title (e.g., First Date)"
          />
          <input
            type="date"
            value={memoryDate}
            onChange={(e) => setMemoryDate(e.target.value)}
          />
          <textarea
            rows={3}
            value={memoryDescription}
            onChange={(e) => setMemoryDescription(e.target.value)}
            placeholder="Describe the memory"
          />
          <button type="button" onClick={handleAdd}>
            Add Memory
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h2>Existing Memories</h2>
        {memories.map((mem) => (
          <div key={mem.id} style={{ marginBottom: "0.5rem" }}>
            <span>
              {mem.title ? `${mem.title} – ` : ""}
              {mem.content}
            </span>
            <div className="button-group">
              <button onClick={() => handleEdit(mem)}>Edit</button>
              <button onClick={() => handleDelete(mem.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <h2>Edit Milestones</h2>
        <div id="admin-form-container">
          <input
            placeholder="Milestone title (e.g., 1000 Days)"
            value={milestoneTitle}
            onChange={(e) => setMilestoneTitle(e.target.value)}
          />
          <input
            type="date"
            value={milestoneDate}
            onChange={(e) => setMilestoneDate(e.target.value)}
          />
          <button type="button" onClick={handleAddMilestone}>
            Add Milestone
          </button>
        </div>

        <div style={{ marginTop: "1rem", width: "100%" }}>
          {milestones.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
                width: "100%",
              }}
            >
              <span>
                {m.date} – {m.title}
              </span>
              <div className="button-group">
                <button type="button" onClick={() => handleEditMilestone(m)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteMilestone(m.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}