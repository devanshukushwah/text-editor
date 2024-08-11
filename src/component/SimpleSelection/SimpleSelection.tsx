import SelectionInput from "../../interface/SelectionInput";
import { simpleReplace } from "../../service/replaceText";
import React, { useEffect, useState } from "react";
import { Checkbox, Space } from "antd";
import { Input } from "antd";
import Content from "../../interface/Content";
import { Typography } from "antd";

const SimpleSelection = (props: SelectionInput) => {
  const [find, setFind] = useState("");
  const [replaceWidth, setReplaceWidth] = useState("");
  const [ignoreCaseCheckbox, setIgnoreCaseCheckbox] = useState(false);
  const [wholeWordCheckbox, setWholeWordCheckbox] = useState(false);

  const handleChange = (e: any) => {
    setFind(e.target.value);
  };

  const handleIgnoreCaseCheckbox = (e: any) => {
    setIgnoreCaseCheckbox(e.target.checked);
  };
  const handleWholeWordCheckbox = (e: any) => {
    setWholeWordCheckbox(e.target.checked);
  };

  useEffect(() => {
    const updateCallBack = (
      content: string,
      find: string,
      replaceWith: string | undefined,
      ignoreCase: boolean,
      wholeWord: boolean
    ) => {
      const result = simpleReplace(
        content,
        find,
        replaceWith || "",
        ignoreCase,
        wholeWord
      );

      const contentObj: Content = {
        original: props.content,
        replaced: result.replaced,
        matchCount: result.matchCount,
      };

      props.setContent(contentObj);
    };

    updateCallBack(
      props.content,
      find,
      replaceWidth,
      ignoreCaseCheckbox,
      wholeWordCheckbox
    );
  }, [
    find,
    ignoreCaseCheckbox,
    wholeWordCheckbox,
    replaceWidth,
    props.content,
  ]);

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%" }} // Make Space component take full width
      >
        <Input
          placeholder="Keyword"
          value={find}
          onChange={handleChange}
          addonBefore={"Find"}
        />
        <Input
          placeholder="New value"
          value={replaceWidth}
          onChange={(e) => setReplaceWidth(e.target.value)}
          addonBefore="Replace"
        />
        <Typography.Text strong>Options:</Typography.Text>
        <div>
          <Checkbox
            checked={ignoreCaseCheckbox}
            onChange={handleIgnoreCaseCheckbox}
          >
            Ignore Case
          </Checkbox>
          <br />
          <Checkbox
            checked={wholeWordCheckbox}
            onChange={handleWholeWordCheckbox}
          >
            Whole word
          </Checkbox>
        </div>
      </Space>
    </>
  );
};

export default SimpleSelection;
