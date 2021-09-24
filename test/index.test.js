const { colorize } = require("../index");

it("prints color text", () => {
  expect(colorize`{red is red color text}`).toBe(
    "\x1B[31mis red color text\x1B[39m"
  );

  const text = "is red color yellow background";
  expect(colorize`{yellow.bgRed ${text} text}`).toBe(
    "\x1B[33m\x1B[41mis red color yellow background text\x1B[49m\x1B[39m"
  );

  expect(
    colorize`{bgBlack.green.strikethrough is red color black background strikethrough text}`
  ).toBe(
    "\x1B[40m\x1B[32m\x1B[9mis red color black background strikethrough text\x1B[29m\x1B[39m\x1B[49m"
  );

  expect(colorize`{redd is red color text}`).toBe("{redd is red color text}");
});
