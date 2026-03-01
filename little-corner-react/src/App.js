import React from "react";
import Timer from "./components/Timer";
import Milestones from "./components/Milestones";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <a href="#timer">Timer</a>
        <a href="#milestones">Milestones</a>
        <a href="#admin">Admin</a>
      </nav>

      <section id="timer">
        <Timer />
      </section>

      <section id="milestones">
        <Milestones />
      </section>

      <section id="admin">
        <Admin />
      </section>
    </div>
  );
}

export default App;