type Colorize = (
  input: TemplateStringsArray,
  ...arg: any[]
) => string

export function createColorize(colors: any): Colorize
