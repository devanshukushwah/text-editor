import React from "react";
import "./style.css";

function Home() {
  return (
    <main className="home-main-box">
      <div className="left">
        <input type="text" placeholder="left" />
        <input type="text" placeholder="right" />
      </div>
      <div className="divider"></div>
      <div className="right">
        <textarea
          style={{ width: "100%" }}
          placeholder="Enter existing text"
        ></textarea>

        <textarea
          style={{ width: "100%" }}
          placeholder="output"
          readOnly
        ></textarea>
      </div>
    </main>
  );
}

export default Home;
