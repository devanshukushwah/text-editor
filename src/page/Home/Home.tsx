import React, { useState } from "react";
import "./style.css";
import Selection from "../../component/Selection/Selection";
import { simpleReplace } from "../../service/replaceText";
import ReplaceResponse from "../../interface/ReplaceResponse";

function Home() {
  const [content, setContent] = useState("");
  const [replacedContent, setReplacedContent] = useState(content);
  const [replacedCount, setReplacedCount] = useState(0);

  const selectionResult = (result: ReplaceResponse) => {
    console.log(result);
    setReplacedContent(result.replaced);
    setReplacedCount(result.count);
  };

  return (
    <main className="home-main-box">
      <div className="left">
        <Selection content={content} setContent={selectionResult} />
      </div>
      <div className="divider"></div>
      <div className="right">
        <textarea
          style={{ width: "100%" }}
          placeholder="Enter existing text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <span>count: </span> {replacedCount}
        <textarea
          style={{ width: "100%" }}
          placeholder="output"
          value={replacedContent}
          readOnly
        ></textarea>
      </div>
    </main>
  );
}

export default Home;
