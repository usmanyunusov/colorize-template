import { colorize } from '../index.browser.cjs'

it('return an empty string for an empty literal', () => {
  expect(colorize``).toBe('')
})

it('return a regular string for a literal with no templates', () => {
  expect(colorize`hello`).toBe('hello')
})

it('correctly perform template parsing', () => {
  expect(
    colorize`{bold Hello, {cyan World!} This is a} test. {green Woo!}`
  ).toBe('Hello, World! This is a test. Woo!')
})

it('correctly perform template substitutions', () => {
  const name = 'Sindre'
  const exclamation = 'Neat'

  expect(
    colorize`{bold Hello, {cyan.inverse ${name}!} This is a} test. {green ${exclamation}!}`
  ).toBe(`Hello, ${name}! This is a test. ${exclamation}!`)
})

it('throw if there is an invalid style', () => {
  expect(colorize`{abadstylethatdoesntexist this shouldn't appear ever}`).toBe(
    `{abadstylethatdoesntexist this shouldn't appear ever}`
  )
})

it('escape interpolated values', () => {
  expect(colorize`Hello {bold hi}`).toBe('Hello hi')
  expect(colorize`Hello ${'{bold hi}'}`).toBe('Hello hi')
})

it('correctly parse newline literals', () => {
  expect(colorize`Hello {red there}`).toBe('Hello there')
})

it('correctly parse newline escapes', () => {
  expect(colorize`Hello\nthere!`).toBe('Hello\nthere!')
})

it('correctly parse escape in parameters', () => {
  const string = '\\'
  expect(colorize`{red ${string}}`).toBe('\\')
})

it('correctly parses unicode/hex escapes', () => {
  expect(
    colorize`\u0078ylophones are fo\x78y! {magenta.inverse \u0078ylophones are fo\x78y!}`
  ).toBe('xylophones are foxy! xylophones are foxy!')
})

it('should not parse upper-case escapes', () => {
  expect(colorize`\N\n\T\t\X07\x07\U000A\u000A\U000a\u000A`).toBe(
    colorize`N\nT\tX07\x07U000A\u000AU000a\u000A`
  )
})

it('should properly handle undefined template interpolated values', () => {
  expect(colorize`hello ${undefined}`).toBe('hello undefined')
  expect(colorize`hello ${null}`).toBe('hello null')
})

it('should allow bracketed Unicode escapes', () => {
  expect(colorize`\u{AB}`).toBe('\u{AB}')
  expect(colorize`This is a {bold \u{AB681}} test`).toBe(
    'This is a \u{AB681} test'
  )
  expect(colorize`This is a {bold \u{10FFFF}} test`).toBe(
    'This is a \u{10FFFF} test'
  )
})
