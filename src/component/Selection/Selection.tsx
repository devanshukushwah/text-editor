import React, { useEffect, useState } from "react";
import { simpleReplace } from "../../service/replaceText";

interface SelectionInput {
  content: string;
  replaceWidth?: string;
  setContent: any;
}

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
    props.setContent(result);
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
  }, [find, ignoreCaseCheckbox, wholeWordCheckbox, props.replaceWidth]);

  return (
    <>
      <label htmlFor="simple">Enter text: </label>
      <input
        type="text"
        name="simple"
        placeholder="Enter your selection text"
        value={find}
        onChange={handleChange}
      />
      <br />
      <input
        type="checkbox"
        name="ignore-case"
        checked={ignoreCaseCheckbox}
        onChange={handleIgnoreCaseCheckbox}
      />
      <label htmlFor="ignore-case">ignore case</label>
      <br />
      <input
        type="checkbox"
        name="whole-word"
        checked={wholeWordCheckbox}
        onChange={handleWholeWordCheckbox}
      />
      <label htmlFor="ignore-case">Whole word</label>
    </>
  );
};

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

  const renderSelectionComponent = () => {
    switch (selectionType) {
      case "simple":
        return <SimpleSelection {...props} replaceWidth={replaceWidth} />;
      case "advance":
        return <AdvanceSelection />;
      default:
        return "error";
    }
  };

  const handleSelectionType = (e: any) => {
    setSelectionType(e.target.value);
  };

  const handleReplaceWidth = (e: any) => {
    setReplaceWidth(e.target.value);
  };

  return (
    <>
      <h2>Find</h2>
      <label htmlFor="select-option">Selection Type: </label>
      <select
        name="select-option"
        onChange={handleSelectionType}
        value={selectionType}
      >
        <option value="simple">Simple</option>
        {/* <option value="advance">Advance</option> */}
      </select>
      <br />
      <br />
      {renderSelectionComponent()}

      <br />
      <br />
      <h2>Replace</h2>
      <label htmlFor="simple-replace-with">Replace with: </label>
      <input
        type="text"
        name="simple-replace-with"
        placeholder="Enter text replace with"
        value={replaceWidth}
        onChange={handleReplaceWidth}
      />
    </>
  );
}

export default Selection;
