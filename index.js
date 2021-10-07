function createColorize(colors = {}) {
  let MARKS = Object.keys(colors).toString().replace(/,/g, '|')
  let RE_BLOCK = new RegExp(
    `\\{((?:${MARKS})(?:\\.(?:${MARKS}))*?)\\s|(\\})|(.[^{}]*)`,
    'gi'
  )

  return (input, ...args) => {
    input = input.reduce((a, s, i) => (a += args[--i] + s))
    let stack = [{ raw: '' }]

    input.replace(RE_BLOCK, (block, open, close, other = '', pos) => {
      if (open) {
        other = block

        if (input.indexOf('}', pos) + 1) {
          stack.push({ marks: open.split('.').reverse(), raw: '' })
          return
        }
      }

      if (close) {
        other = block

        if (stack.length !== 1) {
          let { marks, raw } = stack.pop()
          other = marks.reduce((acc, mark) => colors[mark](acc), raw)
        }
      }

      stack[stack.length - 1].raw += other
    })

    return stack[0].raw
  }
}

module.exports = { createColorize }
