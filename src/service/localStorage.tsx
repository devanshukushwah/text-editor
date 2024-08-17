import DefaultUserSettings from "../interface/DefaultUserSettings";

function set(key: string, value: any) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

function get(key: string) {
  const value = localStorage.getItem(key);
  try {
    if (value) return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

function getDefaultUserSettings(): DefaultUserSettings {
  const data = get("defaultUserSettings");
  return data;

  // const defaultSystemSettings: DefaultUserSettings = {
  //   selectionType: "simple",
  //   simpleSelection: {
  //     ignoreCase: false,
  //     wholeWord: false,
  //   },
  //   advanceSelection: {
  //     ignoreCase: false,
  //     wholeWord: false,
  //     lowerCase: false,
  //     upperCase: false,
  //   },
  // };

  // return defaultSystemSettings;
}

function setDefaultUserSettings(settings: DefaultUserSettings) {
  set("defaultUserSettings", settings);
}

export default { set, get, getDefaultUserSettings, setDefaultUserSettings };
