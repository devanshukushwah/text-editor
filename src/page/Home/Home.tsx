import React, { useState } from "react";
import "./style.css";
import Selection from "../../component/Selection/Selection";
import Content from "../../interface/Content";
import { Input } from "antd";
import AdditionalInfo from "../../component/AdditionalInfo/AdditionalInfo";

const defaultContent: Content = {
  original: "",
  replaced: "",
  matchCount: 0,
};

function Home() {
  const [content, setContent] = useState(defaultContent);
  const selectionResult = (result: Content) => {
    const obj: Content = {
      replaced: result.replaced,
      original: content.original,
      matchCount: result.matchCount,
    };
    setContent(obj);
  };

  return (
    <main className="home-main-box">
      <div className="left">
        <Selection content={content.original} setContent={selectionResult} />
      </div>
      <div className="divider"></div>
      <div className="right">
        <Input.TextArea
          placeholder="Enter existing text"
          value={content.original}
          onChange={(e) => setContent({ ...content, original: e.target.value })}
        ></Input.TextArea>
        <AdditionalInfo count={content.matchCount} />
        <Input.TextArea
          placeholder="output"
          value={content.replaced === content.original ? "" : content.replaced}
          readOnly
        ></Input.TextArea>
      </div>
    </main>
  );
}

export default Home;
