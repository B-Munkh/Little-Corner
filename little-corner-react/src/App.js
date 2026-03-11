import React, { useState } from "react";
import Timer from "./components/Timer";
import Milestones from "./components/Milestones";
import Reasons from "./components/Reasons";
import Playlist from "./components/Playlist";
import Timeline from "./components/Timeline";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavClick = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <nav>
        <a href="#home" onClick={handleNavClick("home")}>
          Home
        </a>
        <a href="#timeline" onClick={handleNavClick("timeline")}>
          Our Timeline
        </a>
        <a href="#admin" onClick={handleNavClick("admin")}>
          Edit Memories
        </a>
      </nav>

      {activeTab === "home" && (
        <section id="home">
          <Timer />
          <Milestones />
          <Reasons />
          <Playlist />
        </section>
      )}

      {activeTab === "timeline" && (
        <section id="timeline">
          <Timeline />
        </section>
      )}

      {activeTab === "admin" && (
        <section id="admin">
          <Admin />
        </section>
      )}
    </div>
  );
}

export default App;