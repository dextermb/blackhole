const { v4: uuid } = require('uuid')
const parser = require('mailparser').simpleParser

const constant = require('../../constants/mail')
const json = require('../../utilities/mail/to-json')
const log = require('../../utilities/log')
const write = require('../../utilities/write-to-file')

const handler = (stream, _, callback) => {
  const chunks = []

  stream.on('data', chunk => {
    chunks.push(chunk)
  })

  stream.on('end', async () => {
    const data = Buffer.concat(chunks).toString('utf8')
    const parsed = await parser(data)
    const from = parsed.headers.get('from').value[0].address
    const path = `${constant.STORAGE_PATH}/mail/${from}/${uuid()}`

    log.event(`Email recieved from ${from}`)

    await write(`${path}/raw`, data)
    await write(`${path}/json`, json(parsed))

    log.event(`Email written to ${path}`)

    callback()
  })
}

module.exports = handler
