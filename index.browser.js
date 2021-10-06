function createColorize(colors = {}) {
  let MARKS = Object.keys(colors).toString().replace(/,/g, '|')
  let RE_BLOCK = new RegExp(
    `\\{((?:${MARKS})(?:\\.(?:${MARKS}))*?)\\s|(\\})|(.|[\r\n\f])`,
    'gi'
  )

  return (input, ...args) => {
    let str = input.reduce((a, s, i) => (a += args[--i] + s))
    let stack = [{ raw: '' }]

    str.replace(RE_BLOCK, (block, open, close, other = '') => {
      if (open) {
        stack.push({ marks: open.split('.').reverse(), raw: '' })
      }

      if (close) {
        other = close

        if (stack.length !== 1) {
          let { raw } = stack.pop()
          other = raw
        }
      }

      stack[stack.length - 1].raw += other
    })

    return stack[0].raw
  }
}

module.exports = { createColorize }
