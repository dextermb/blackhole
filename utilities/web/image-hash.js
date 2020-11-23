const hash = require('string-hash')
const color = require('tinycolor2')

const ImageHash = str => {
  const n = hash(str || '')
  const c = color({ h: n % 360, s: 0.95, l: 0.5 })

  return [
    c.toHexString(),
    c.triad()[1].toHexString()
  ]
}

module.exports = ImageHash
