const { v4: uuid } = require('uuid')
const parser = require('mailparser').simpleParser

const db = require('../../services/db')
const constant = require('../../constants/mail')
const log = require('../../utilities/log')
const write = require('../../utilities/write')
const util = require('../../utilities/mail')

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
    log.info('Filtering email')

    let filtered = parsed
    const filters = await db.get('filters').find({})

    for (let i = 0; i < filters.length; i++) {
      const curr = filters[i]

      switch (curr.type) {
        case constant.FILTER.SUBJECT:
        case constant.FILTER.CONTENT:
          filtered = util.filter[curr.type](parsed, curr.regexp, curr.replacement)

          break
      }
    }

    await write(`${path}/raw`, await util.fromJson(filtered))
    await write(`${path}/json`, util.toJson(filtered))

    log.event(`Email written to ${path}`)

    callback()
  })
}

module.exports = handler
