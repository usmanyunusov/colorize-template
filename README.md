# Nano Colors Template

<img align="right" width="128" height="120"
     src="https://github.com/ai/nanocolors/blob/main/img/logo.svg"
     title="Nano Colors logo by Roman Shamin">

Tagged template literal for [**`nanocolors`**](https://github.com/ai/nanocolors).

```js
import { colorize } from 'nanocolors-template';

colorize`{red Is red color text}`;
colorize`{yellow.bgRed ${"yellow"} text}`;
colorize`{bgBlack.green.strikethrough is red color black background strikethrough text}`;
colorize`{red Is red color and {yellow yellow color} text}`;
```

Blocks are delimited by an opening curly brace `{`, a style, some content, and a closing curly brace `}`.
