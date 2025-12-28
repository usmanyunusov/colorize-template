let assert = require('assert')
let pc = require('picocolors')
const { createColorize } = require('../index.browser.js')

function test(name, fn) {
  try {
    fn()
    console.log(pc.green('✓ ' + name))
  } catch (error) {
    console.log(pc.red('✗ ' + name))
    throw error
  }
}

let colorize = createColorize({
  ...pc,
  warn: pc.yellow
})

console.log('Testing browser.js')

test('custom warn color', () => {
  assert.equal(colorize`Yep! {warn Warning} text`, `Yep! Warning text`)
})

test('empty libs', () => {
  let colorize = createColorize()
  assert.equal(colorize`Yep! {red Warning } text`, `Yep! {red Warning } text`)
})

test('return an empty string for an empty literal', () => {
  assert.equal(colorize``, '')
})

test('return a regular string for a literal with no templates', () => {
  assert.equal(colorize`hello`, 'hello')
})

test('correctly perform template parsing', () => {
  assert.equal(
    colorize`{bold Hello, {cyan World!} This is a} test. {green Woo!}`,
    'Hello, World! This is a test. Woo!'
  )
})

test('correctly perform template substitutions', () => {
  const name = 'Sindre'
  const exclamation = 'Neat'

  assert.equal(
    colorize`{bold Hello, {cyan.inverse ${name}!} This is a} test. {green ${exclamation}!}`,
    `Hello, ${name}! This is a test. ${exclamation}!`
  )
})

test('throw if there is an invalid style', () => {
  assert.equal(
    colorize`{abadstylethatdoesntexist this shouldn't appear ever}`,
    `{abadstylethatdoesntexist this shouldn't appear ever}`
  )
})

test('escape interpolated values', () => {
  assert.equal(colorize`Hello {bold hi}`, 'Hello hi')
  assert.equal(colorize`Hello ${'{bold hi}'}`, 'Hello hi')
})

test('correctly parse newline literals', () => {
  assert.equal(colorize`Hello {red there}`, 'Hello there')
})

test('correctly parse newline escapes', () => {
  assert.equal(colorize`Hello\nthere!`, 'Hello\nthere!')
})

test('correctly parse escape in parameters', () => {
  const string = '\\'
  assert.equal(colorize`{red ${string}}`, '\\')
})

test('correctly parse newline escapes after template', () => {
  assert.equal(colorize`Hello {red there}\nafter`, 'Hello there\nafter')
})

test('correctly parses unicode/hex escapes', () => {
  assert.equal(
    colorize`\u0078ylophones are fo\x78y! {magenta.inverse \u0078ylophones are fo\x78y!}`,
    'xylophones are foxy! xylophones are foxy!'
  )
})

test('should not parse upper-case escapes', () => {
  assert.equal(
    colorize`\N\n\T\t\X07\x07\U000A\u000A\U000a\u000A`,
    colorize`N\nT\tX07\x07U000A\u000AU000a\u000A`
  )
})

test('should properly handle undefined template interpolated values', () => {
  assert.equal(colorize`hello ${undefined}`, 'hello undefined')
  assert.equal(colorize`hello ${null}`, 'hello null')
})

test('should allow bracketed Unicode escapes', () => {
  assert.equal(colorize`\u{AB}`, '\u{AB}')
  assert.equal(
    colorize`This is a {bold \u{AB681}} test`,
    'This is a \u{AB681} test'
  )
  assert.equal(
    colorize`This is a {bold \u{10FFFF}} test`,
    'This is a \u{10FFFF} test'
  )
})
