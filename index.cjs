const nanocolors = require('nanocolors')

const MARKS = Object.keys(nanocolors).toString().replace(/,/g, '|')
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
      marks = marks.split('.')

      while (marks.length) {
        let mark = marks.pop()
        content = nanocolors[mark](content)
      }

      return content
    })
  }

  return string
}

module.exports = { colorize }
