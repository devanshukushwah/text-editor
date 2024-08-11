import React, { useState } from "react";
import { Typography } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SimpleSelection from "../SimpleSelection/SimpleSelection";
import { Input } from "antd";

interface SelectionInput {
  content: string;
  replaceWidth?: string;
  setContent: any;
}

function Selection(props: SelectionInput) {
  const [selectionType, setSelectionType] = useState("simple");

  const handleSelectionType = (e: any) => {
    setSelectionType(e.target.value);
  };

  const findItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: <SimpleSelection {...props} />,
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
      <Tabs defaultActiveKey="1" items={findItems} />
    </>
  );
}

export default Selection;
