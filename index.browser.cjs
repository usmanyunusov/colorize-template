const MARKS = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite'
]
  .toString()
  .replace(/,/g, '|')

const RE_BLOCK = new RegExp(
  `\\{((?:${MARKS})(?:\\.(?:${MARKS}))*)\\s([^}]*[^{]*)\\}`,
  'gi'
)

function colorize(strings, ...interpolations) {
  let string = strings.reduce(
    (a, s, i) => (a += String(interpolations[i - 1]) + s)
  )

  while (RE_BLOCK.test(string)) {
    string = string.replace(RE_BLOCK, (_, marks, content) => {
      return content
    })
  }

  return string
}

module.exports = { colorize }
