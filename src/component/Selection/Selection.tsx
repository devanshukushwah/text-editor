import React, { useEffect, useState } from "react";
import { simpleReplace } from "../../service/replaceText";
import { Typography } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Divider } from "antd";
import SimpleSelection from "../SimpleSelection/SimpleSelection";
import { Input } from "antd";

interface SelectionInput {
  content: string;
  replaceWidth?: string;
  setContent: any;
}

function AdvanceSelection() {
  return (
    <>
      <input type="checkbox" name="lowercase-letter" />
      <label htmlFor="lowercase-letter">Lowercase letter</label>
      <br />
      <input type="checkbox" name="uppercase-letter" />
      <label htmlFor="uppercase-letter">Uppercase letter</label>
      <br />
      <input type="checkbox" name="number" />
      <label htmlFor="number">Number</label>
      <br />
      <input type="checkbox" name="space" />
      <label htmlFor="space">Space</label>
    </>
  );
}

function Selection(props: SelectionInput) {
  const [selectionType, setSelectionType] = useState("simple");
  const [replaceWidth, setReplaceWidth] = useState("");

  const handleSelectionType = (e: any) => {
    setSelectionType(e.target.value);
  };

  const handleReplaceWidth = (e: any) => {
    setReplaceWidth(e.target.value);
  };

  const findItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: <SimpleSelection {...props} replaceWidth={replaceWidth} />,
    },
    {
      key: "2",
      label: "Advance",
      children: "Content of Tab Pane 2",
      disabled: true,
    },
    {
      key: "3",
      label: "Regex",
      children: "Content of Tab Pane 3",
      disabled: true,
    },
  ];

  return (
    <>
      <Typography.Title level={2}>Find</Typography.Title>
      <Tabs defaultActiveKey="1" items={findItems} />
      <Divider />
      <Typography.Title level={2}>Replace</Typography.Title>
      <Input
        placeholder="New value"
        value={replaceWidth}
        onChange={handleReplaceWidth}
      />
    </>
  );
}

export default Selection;
