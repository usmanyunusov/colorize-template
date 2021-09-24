const nanocolors = require("nanocolors");

const OPEN_CURLY = "{".charCodeAt(0);
const RE_WORD_END = /[{]|\/(?=\*)/g;

function colorize(strings, ...args) {
  let result = "";
  let pos = 0;
  let next, code;
  let str = strings.map((str, i) => str + (args[i] || "")).join("");
  let length = str.length;

  while (pos < length) {
    code = str.charCodeAt(pos);

    switch (code) {
      case OPEN_CURLY: {
        next = str.indexOf("}", pos + 1);

        if (next !== -1) {
          let content = str.slice(pos, next + 1);
          let spacePos = content.indexOf(" ");
          let functions = content.slice(1, spacePos).split(".");

          if (functions.every((fn) => nanocolors[fn])) {
            let text = content.slice(spacePos + 1, -1);

            while (functions.length) {
              let fn = functions.pop();

              if (fn !== "isColorSupported") {
                text = nanocolors[fn](text);
              }
            }

            result += text;
          } else {
            result += content;
          }

          pos = next;
          break;
        }
      }

      default: {
        RE_WORD_END.lastIndex = pos + 1;
        RE_WORD_END.test(str);

        if (RE_WORD_END.lastIndex === 0) {
          next = str.length - 1;
        } else {
          next = RE_WORD_END.lastIndex - 2;
        }

        result += str.slice(pos, next + 1);

        pos = next;
        break;
      }
    }

    pos++;
  }

  return result;
}

module.exports = {
  colorize,
};
