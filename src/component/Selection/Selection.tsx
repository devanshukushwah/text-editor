import React, { useState } from "react";
import { Typography } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SimpleSelection from "../SimpleSelection/SimpleSelection";
import { Input } from "antd";
import AdvanceSelection from "../AdvanceSelection/AdvanceSelection";

interface SelectionInput {
  content: string;
  replaceWidth?: string;
  setContent: any;
}

function Selection(props: SelectionInput) {
  const [selectionType, setSelectionType] = useState<String>("1");

  const handleSelectionType = (tabKey: string) => {
    // console.log(e);
    setSelectionType(tabKey);
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
      children: <AdvanceSelection {...props} />,
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
      <Tabs
        defaultActiveKey="1"
        items={findItems}
        onChange={handleSelectionType}
      />
    </>
  );
}

export default Selection;
