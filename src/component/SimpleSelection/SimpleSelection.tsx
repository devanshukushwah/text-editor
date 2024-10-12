import SelectionInput from "../../interface/SelectionInput";
import { simpleReplace } from "../../service/replaceText";
import React, { useEffect, useState } from "react";
import { Checkbox, Space } from "antd";
import { Input } from "antd";
import Content from "../../interface/Content";
import { Typography } from "antd";
import localStorage from "../../service/localStorage";
import DefaultUserSettings from "../../interface/DefaultUserSettings";
import SimpleSelectionInterface from "../../interface/SimpleSelection";

const defaultUserSettings: DefaultUserSettings =
  localStorage.getDefaultUserSettings();

const SimpleSelection = (props: SelectionInput) => {
  const [find, setFind] = useState("");
  const [replaceWidth, setReplaceWidth] = useState("");

  const [settings, setSettings] = useState<SimpleSelectionInterface>(
    defaultUserSettings?.simpleSelection ?? {
      ignoreCase: false,
      wholeWord: false,
    }
  );

  const updateDefaultSettings = (settings: SimpleSelectionInterface) => {
    let defaultUserSettings: DefaultUserSettings =
      localStorage.getDefaultUserSettings();
    defaultUserSettings.simpleSelection = settings;
    localStorage.setDefaultUserSettings(defaultUserSettings);
  };

  const handleIgnoreCaseCheckbox = (e: any) => {
    const newSettings: SimpleSelectionInterface = {
      ...settings,
      ignoreCase: e.target.checked,
    };

    // update useState
    setSettings(newSettings);

    // updateLocalStorage
    updateDefaultSettings(newSettings);
  };

  const handleWholeWordCheckbox = (e: any) => {
    const newSettings: SimpleSelectionInterface = {
      ...settings,
      wholeWord: e.target.checked,
    };

    // update useState
    setSettings(newSettings);

    // updateLocalStorage
    updateDefaultSettings(newSettings);
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
      settings.ignoreCase,
      settings.wholeWord
    );
  }, [find, settings, replaceWidth, props.content]);

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%" }} // Make Space component take full width
      >
        <Input
          placeholder="Keyword"
          value={find}
          onChange={(e) => setFind(e.target.value)}
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
            checked={settings?.ignoreCase}
            onChange={handleIgnoreCaseCheckbox}
          >
            Ignore Case
          </Checkbox>
          <br />
          <Checkbox
            checked={settings?.wholeWord}
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
