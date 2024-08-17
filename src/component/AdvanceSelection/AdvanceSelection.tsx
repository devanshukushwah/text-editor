import React, { useEffect, useState } from "react";
import SelectionInput from "../../interface/SelectionInput";
import {
  Checkbox,
  Divider,
  Input,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import AdvanceSelectionInteface from "../../interface/AdvanceSelection";
import DefaultUserSettings from "../../interface/DefaultUserSettings";
import localStorage from "../../service/localStorage";
import Content from "../../interface/Content";
import regexGenerator from "../../service/regexGenerator";
import RegexProps from "../../interface/RegexProps";
import InvalidArgumentException from "../exception/InvalidArgumentException";
import * as replaceText from "../../service/replaceText";
import { ReplaceProps } from "../../interface/ReplaceProps";

const defaultUserSettings: DefaultUserSettings =
  localStorage.getDefaultUserSettings();

interface PrefixPostfixProps {
  replace: ReplaceProps;
  setReplace: any;
}

const PrefixPostfix = (props: PrefixPostfixProps) => {
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        placeholder="prefix"
        style={{ width: "40%" }}
        value={props.replace.prefix}
        onChange={(e) =>
          props.setReplace({ ...props.replace, prefix: e.target.value })
        }
      ></Input>
      <Input placeholder="match" disabled style={{ width: "20%" }}></Input>
      <Input
        placeholder="postfix"
        style={{ width: "40%" }}
        value={props.replace.postfix}
        onChange={(e) =>
          props.setReplace({ ...props.replace, postfix: e.target.value })
        }
      ></Input>
    </Space.Compact>
  );
};

function AdvanceSelection(props: SelectionInput) {
  const [settings, setSettings] = useState<AdvanceSelectionInteface>(
    defaultUserSettings.advanceSelection ?? {
      ignoreCase: false,
      includeLowerCase: false,
      wholeWord: false,
      includeUpperCase: false,
      startWith: "",
      endWith: "",
    }
  );

  const [replaceSelectionType, setReplaceSelectionType] = useState<String>("1");

  const [replace, setReplace] = useState<ReplaceProps>({
    prefix: "",
    replaceWith: "",
    postfix: "",
  });

  const updateDefaultSettings = (settings: AdvanceSelectionInteface) => {
    let defaultUserSettings: DefaultUserSettings =
      localStorage.getDefaultUserSettings();
    defaultUserSettings.simpleSelection = settings;
    localStorage.setDefaultUserSettings(defaultUserSettings);
  };

  const handleCheckboxChanges = (attribute: string, value: boolean) => {
    const newSettings: AdvanceSelectionInteface = {
      ...settings,
      [attribute]: value,
    };

    // update useState
    setSettings(newSettings);

    // updateLocalStorage
    updateDefaultSettings(newSettings);
  };

  const disableIndividualCheckbox = (): boolean => {
    return settings.startWith.length > 0 || settings.endWith.length > 0;
  };

  const handleReplaceSelectionType = (tabKey: string) => {
    // console.log(e.target.value);
    setReplaceSelectionType(tabKey);
  };

  const replaceItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: (
        <Input
          addonBefore="Replace"
          value={replace.replaceWith}
          onChange={(e) =>
            setReplace({ ...replace, replaceWith: e.target.value })
          }
        ></Input>
      ),
    },
    {
      key: "2",
      label: "Prefix/Postfix",
      children: (
        <PrefixPostfix
          replace={replace}
          setReplace={setReplace}
        ></PrefixPostfix>
      ),
    },
  ];

  useEffect(() => {
    if (
      settings.includeLowerCase ||
      settings.includeUpperCase ||
      settings.wholeWord ||
      settings.includeNumbers ||
      settings.startWith ||
      settings.endWith
    ) {
      if (replaceSelectionType === "1") {
        console.log(replace);

        const data: Content = replaceText.replace(
          settings,
          props.content,
          replace.replaceWith ?? ""
        );
        props.setContent(data);
      } else if (replaceSelectionType === "2") {
        console.log(replace);
        // let prefixPostfixArray = [];
        // if (replace.prefix) {
        //   prefixPostfixArray.push(replace.prefix);
        // }
        // if (replace.postfix) {
        //   prefixPostfixArray.push(replace.postfix);
        // }

        const finalReplaceRegex = `${replace.prefix ?? ""}$&${
          replace.postfix ?? ""
        }`;

        const data: Content = replaceText.replace(
          settings,
          props.content,
          finalReplaceRegex ?? ""
        );
        props.setContent(data);
      }
    } else {
      const data: Content = {
        original: props.content,
        matchCount: 0,
        replaced: props.content,
      };
      props.setContent(data);
    }
  }, [settings, props.content, replace, replaceSelectionType]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div>
        <Typography.Title level={5}>Selection Options</Typography.Title>
        <Checkbox
          checked={settings.includeLowerCase}
          onChange={(e) =>
            handleCheckboxChanges("includeLowerCase", e.target.checked)
          }
          disabled={disableIndividualCheckbox()}
        >
          Lower Case Character
        </Checkbox>
        <br />
        <Checkbox
          checked={settings.includeUpperCase}
          onChange={(e) =>
            handleCheckboxChanges("includeUpperCase", e.target.checked)
          }
          disabled={disableIndividualCheckbox()}
        >
          Upper Case Character
        </Checkbox>
        <br />
        <Checkbox
          checked={settings.includeNumbers}
          onChange={(e) =>
            handleCheckboxChanges("includeNumbers", e.target.checked)
          }
          disabled={disableIndividualCheckbox()}
        >
          Number
        </Checkbox>
        <br />
        <Checkbox
          checked={settings.wholeWord}
          onChange={(e) => handleCheckboxChanges("wholeWord", e.target.checked)}
          disabled={disableIndividualCheckbox()}
        >
          Whole word
        </Checkbox>
        <br />
      </div>

      <Input
        addonBefore="Start With"
        value={settings.startWith}
        onChange={(e) =>
          setSettings({ ...settings, startWith: e.target.value })
        }
      ></Input>
      <Input
        addonBefore="End With"
        value={settings.endWith}
        onChange={(e) => setSettings({ ...settings, endWith: e.target.value })}
      ></Input>
      <Divider />
      <div>
        <Typography.Title level={5}>Replace Options</Typography.Title>
        <Tabs
          defaultActiveKey="1"
          items={replaceItems}
          onChange={handleReplaceSelectionType}
        />
      </div>
    </Space>
  );
}

export default AdvanceSelection;
