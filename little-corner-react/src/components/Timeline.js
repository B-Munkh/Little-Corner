import React, { useEffect, useState } from "react";
import { fetchMemories } from "../api";
import "../App.css";

export default function Timeline() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetchMemories().then(setMemories).catch(console.error);
  }, []);

  return (
    <div style={{ paddingBottom: "2rem" }}>
      <h2>Our Story So Far</h2>
      <div className="timeline">
        {memories.map((m) => (
          <div className="timeline-event" key={m.id}>
            <div className="timeline-content">
              <div className="timeline-date">
                {m.date
                  ? new Date(m.date).toLocaleDateString()
                  : m.createdAt
                  ? new Date(m.createdAt).toLocaleDateString()
                  : ""}
              </div>
              {m.title && <h3 className="timeline-title">{m.title}</h3>}
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}