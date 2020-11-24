const parser = require('mailparser').simpleParser
const dir = require('make-dir')
const fs = require('fs')
const util = require('util')

const constant = require('../../constants/mail')
const json = require('../../utilities/mail/to-json')
const log = require('../../utilities/log')

const handler = (stream, _, callback) => {
  const chunks = []

  stream.on('data', chunk => {
    chunks.push(chunk)
  })

  stream.on('end', async () => {
    const data = Buffer.concat(chunks).toString('utf8')
    const parsed = await parser(data)
    const from = parsed.headers.get('from').value[0].address
    const path = `${constant.STORAGE_PATH}/mail/${from}/${+new Date()}`

    log.event(`Email recieved from ${from}`)

    const write = util.promisify(fs.writeFile)

    // Make directory
    await dir(path)

    // Write raw file
    await write(`${path}/raw`, data)

    // Write json file
    await write(`${path}/json`, json(parsed))

    log.event(`Email written to ${path}`)

    callback()
  })
}

module.exports = handler
