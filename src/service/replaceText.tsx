import Content from "../interface/Content";
import RegexProps from "../interface/RegexProps";
import regexGenerator from "./regexGenerator";

function simpleReplace(
  text: string,
  find: string,
  replaceWith: string,
  ignoreCase: boolean = false,
  wholeWord: boolean = false
): Content {
  if (!find) {
    return { original: text, replaced: text, matchCount: 0 };
  }

  // Build the regular expression pattern
  let pattern = find;

  // If wholeWord is true, add word boundary anchors
  if (wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }

  // Set the flags for the regular expression
  let flags = "g"; // global flag to replace all instances
  if (ignoreCase) {
    flags += "i"; // case-insensitive flag
  }

  // Create the regular expression
  const regex = new RegExp(pattern, flags);

  // Use the match method to find all matches
  const matches = text.match(regex);
  // If there are no matches, return 0; otherwise, return the number of matches
  const count = matches ? matches.length : 0;

  // Replace the text using the regular expression
  const replaced = text.replace(regex, replaceWith);
  const result: Content = { matchCount: count, replaced, original: text };
  return result;
}

function replace(args: RegexProps, text: string, newValue: string): Content {
  const regex = regexGenerator(args);

  console.log(regex);

  // Use the match method to find all matches
  const matches = text.match(regex);
  // If there are no matches, return 0; otherwise, return the number of matches
  const count = matches ? matches.length : 0;

  // Replace the text using the regular expression
  const replaced = text.replace(regex, newValue);

  const result: Content = { matchCount: count, replaced, original: text };

  return result;
}

export { simpleReplace, replace };
