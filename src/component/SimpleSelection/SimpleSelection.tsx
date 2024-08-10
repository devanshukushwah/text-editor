import SelectionInput from "../../interface/SelectionInput";
import { simpleReplace } from "../../service/replaceText";
import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { Input } from "antd";
import Content from "../../interface/Content";

const SimpleSelection = (props: SelectionInput) => {
  const [find, setFind] = useState("");
  const [ignoreCaseCheckbox, setIgnoreCaseCheckbox] = useState(false);
  const [wholeWordCheckbox, setWholeWordCheckbox] = useState(false);

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
    updateCallBack(
      props.content,
      find,
      props.replaceWidth,
      ignoreCaseCheckbox,
      wholeWordCheckbox
    );
  }, [
    find,
    ignoreCaseCheckbox,
    wholeWordCheckbox,
    props.replaceWidth,
    props.content,
  ]);

  return (
    <>
      <Input placeholder="Keyword" value={find} onChange={handleChange} />
      <Checkbox
        checked={ignoreCaseCheckbox}
        onChange={handleIgnoreCaseCheckbox}
      >
        Ignore Case
      </Checkbox>
      <br />
      <Checkbox checked={wholeWordCheckbox} onChange={handleWholeWordCheckbox}>
        Whole word
      </Checkbox>
    </>
  );
};

export default SimpleSelection;
