# Colorize Template

Tagged template literal for ANSI colors.

> You need to provides an object which includes a variety of text coloring and formatting functions. You can use ready-made projects: `Picocolors`, `Colorette`, `Kleur`, `Colors.js`, `Chalk`

```js
import { createColorize } from 'colorize-template'
import * as picocolors from 'picocolors'
import * as colorette from 'colorette'

let colorize = createColorize({
  ...picocolors,
  success: picocolors.green,
  error: colorette.red
})

colorize`Is red {red color} text`
colorize`Run {yellow.bgRed ${'yellow'} test}`
colorize`Is red {error error and {success green text}}`
```

- No dependencies.
- Node.js v6+ & browsers support. Support both CJS and ESM projects.
- TypeScript type declarations included.

> Blocks are delimited by an opening curly brace `{`, a style, some content, and a closing curly brace `}`.
