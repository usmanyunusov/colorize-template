# Nano Colors Template

```js
const { colorize } = require("nanocolors-template");

colorize`{red is red color text}`;

const text = "is red color yellow background ";
colorize`{yellow.bgRed ${text} text}`;

colorize`{bgBlack.green.strikethrough is red color black background strikethrough text}`;
```
