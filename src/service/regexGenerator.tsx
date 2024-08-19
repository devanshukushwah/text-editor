import InvalidArgumentException from "../component/exception/InvalidArgumentException";
import Content from "../interface/Content";
import RegexProps from "../interface/RegexProps";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function regexGenerator(args: RegexProps) {
  const {
    ignoreCase = false,
    wholeWord = false,
    includeLowerCase = false,
    includeUpperCase = false,
    startWith = "",
    endWith = "",
    includeNumbers = false,
  } = args;
  let flag = "g";

  if (ignoreCase) {
    flag += "i";
  }

  let pattern = "";

  let charSet = "";
  if (includeLowerCase) charSet += "a-z";
  if (includeUpperCase) charSet += "A-Z";
  if (includeNumbers) charSet += "\\d";

  if (charSet !== "") {
    pattern = `[${charSet}]${wholeWord ? "+" : ""}`;
  }

  if (wholeWord && pattern) {
    pattern = `\\b${pattern}\\b`;
    // pattern = "[a-z]";
  }

  if (!pattern && wholeWord) {
    return new RegExp("\\S+", flag);
  }

  let letStartWidth = "";
  let letEndWidth = "";

  if (startWith) {
    letStartWidth = escapeRegExp(startWith);
  }

  if (endWith) {
    letEndWidth = escapeRegExp(endWith);
  }

  // if (startWith) {
  //   return new RegExp(`\\b${escapeRegExp(startWith)}\\S*\\b`, flag);
  // }

  if (letStartWidth || letEndWidth) {
    return new RegExp(`\\b${startWith}\\S*${endWith}\\b`, flag);
  }

  const formedRegex = new RegExp(pattern, flag);
  return formedRegex;
}

// function regexGenerator(args: RegexProps) {
//   const {
//     ignoreCase = false,
//     wholeWord = false,
//     includeLowerCase = false,
//     includeUpperCase = false,
//     startWith = "",
//     endWith = "",
//     includeNumbers = false,
//   } = args;
//   let pattern = "";

//   // Start with
//   // if (startWith) {
//   //   pattern += "^" + startWith;
//   // }

//   // Character classes
//   let characterClass = "";

//   if (includeLowerCase) characterClass += "a-z";
//   if (includeUpperCase) characterClass += "A-Z";
//   if (includeNumbers) characterClass += "0-9";

//   if (characterClass) {
//     pattern += `[${characterClass}]+`;
//   }

//   // End with
//   // if (endWith) {
//   //   pattern += endWith + "$";
//   // }

//   // Whole word boundary
//   if (wholeWord) {
//     pattern = `\\b${pattern}\\b`;
//   }

//   // Flags
//   let flags = "g";
//   if (ignoreCase) flags += "i";

//   return new RegExp(pattern, flags);
// }

export default regexGenerator;
