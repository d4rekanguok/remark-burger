function plugin({ beginMarker, endMarker, onlyRunWithMarker = false } = {}) {

  if (onlyRunWithMarker && !(beginMarker || endMarker)) return

  beginMarker = beginMarker || '[['
  endMarker = endMarker || ']]'

  // eslint-disable-next-line no-console
  console.log(beginMarker, endMarker)

  function tokenizeVideo(eat, value, silent) {
    const offset = beginMarker.length
    const openIndex = value.indexOf(beginMarker)
    if (openIndex !== 0) return

    const remaining = value.substring(openIndex + offset)
    const closeIndex = remaining.indexOf(endMarker)
    if (closeIndex === -1) return

    if (silent) return true

    const content = remaining.substring(0, closeIndex)
    return eat(`${beginMarker}${content}${endMarker}`)({
      type: 'patty',
      value: '',
      data: { content }
    })
  }

  function locator (value, fromIndex) {
    return value.indexOf(beginMarker, fromIndex)
  }

  tokenizeVideo.locator = locator
  tokenizeVideo.notInBlock = true
  tokenizeVideo.notInList = true
  tokenizeVideo.notInLink = true

  const Parser = this.Parser
  const {
    inlineTokenizers: tokenizers,
    inlineMethods: methods
  } = Parser.prototype

  tokenizers.patty = tokenizeVideo
  methods.splice(methods.indexOf('text'), 0, 'patty')

  const Compiler = this.Compiler
  if (Compiler) {
    const visitors = Compiler.prototype.visitors
    if (!visitors) return
    visitors.patty = () => ''
  }
}

module.exports = plugin