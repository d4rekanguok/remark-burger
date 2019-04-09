const remark = require('remark')
const plugin = require('.')

const render = (text, options) => remark()
  .use(plugin, options)
  .processSync(text)
  .toString()

test('it uses default setting', () => {
  const result = render('hello [[world]]')
  expect(result).toBe('hello \n')
})

test('it does nothing when `onlyRunWithMarker` is true without any markers', () => {
  const result = render('hello [[world]]', {
    onlyRunWithMarker: true
  })
  expect(result).toBe('hello \\[[world]]\n')
})

test('it uses `onlyRunWithMarker` with specified markers', () => {
  const result = render('hello +world]]', {
    onlyRunWithMarker: true,
    beginMarker: '+',
  })
  expect(result).toBe('hello \n')
})

test('it accepts custom markers', () => {
  const result = render('hello <<world>>', {
    beginMarker: '<<',
    endMarker: '>>'
  })
  expect(result).toBe('hello \n')
})

test('it accepts custom markers', () => {
  const result = render('hello --world--', {
    beginMarker: '--',
    endMarker: '--'
  })
  expect(result).toBe('hello \n')
})

test('it won\'t work with square bracket', () => {
  const result = render('hello [world]', {
    beginMarker: '[',
    endMarker: ']'
  })
  expect(result).toBe('hello [world]\n')
})

function pattyStringify() {
  const Compiler = this.Compiler
  const { visitors } = Compiler.prototype
  visitors.patty = (node) => {
    // eslint-disable-next-line no-console
    console.log(node)
    return `\`${node.data.content}\``
  }
}

test('it works with custom stringify', () => {
  const result = remark()
  .use(plugin)
  .use(pattyStringify)
  .processSync('hello [[world]]')
  .toString()
  expect(result).toBe('hello `world`\n')
})