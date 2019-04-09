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