import React, { useState } from "react";
import "./style.css";
import Selection from "../../component/Selection/Selection";
import Content from "../../interface/Content";
import { Col, Divider, Flex, Input, Row, Space } from "antd";
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
    <>
      <Flex>
        <div style={{ width: "49%" }}>
          <Selection content={content.original} setContent={selectionResult} />
        </div>
        <Divider
          type="vertical"
          style={{ height: "calc(100vh - 50px)", width: "1px" }}
        />
        <Space
          direction="vertical"
          style={{ width: "50%" }} // Make Space component take full width
        >
          <Input.TextArea
            placeholder="Enter existing text"
            value={content.original}
            onChange={(e) =>
              setContent({ ...content, original: e.target.value })
            }
            rows={10}
          ></Input.TextArea>
          <AdditionalInfo {...content} />
          <Input.TextArea
            placeholder="output"
            value={content.replaced}
            rows={10}
            readOnly
          ></Input.TextArea>
        </Space>
      </Flex>
    </>
  );
}

export default Home;
