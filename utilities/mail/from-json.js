const Composer = require('nodemailer/lib/mail-composer')

function reviver (_, value) {
  if (value && typeof value === 'object') {
    if (value.dataType === 'map') {
      return new Map(value.value)
    }
  }
  return value
}

const fromJson = async data => new Promise(resolve => {
  if (typeof data === 'string') {
    data = JSON.parse(data, reviver)
  }

  if (typeof data !== 'object') {
    return resolve('')
  }

  const compiler = (new Composer(data)).compile()
  compiler.keepBcc = true

  const stream = compiler.createReadStream()
  const chunks = []

  stream.on('data', chunk => {
    chunks.push(chunk)
  })

  stream.on('end', () => {
    resolve(Buffer.concat(chunks).toString('utf8'))
  })
})

module.exports = fromJson
