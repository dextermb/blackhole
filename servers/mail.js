const SMTP = require('smtp-server').SMTPServer

const dev = require('../utilities/is-dev')
const log = require('../utilities/log')

if (dev) {
  const path = require('path')
  const fs = require('fs')
  const env = path.join(path.dirname(__dirname), '.env')

  if (fs.existsSync(env)) {
    require('dotenv').config({
      path: env
    })

    console.log(`Loaded env from ${env}`)
  }
}

const hook = require('../hooks/mail')

const opts = {
  name: process.env.HOSTNAME,
  onAuth: hook.authenticate,
  onConnect: hook.connect,
  onClose: hook.disconnect,
  onData: hook.data,
  onMailFrom: hook.from,
  onRcptTo: hook.to
}

const server = new SMTP(opts)
const port = 25

log.info('Starting mailserver')

server.listen(port, () => {
  log.ready(`Mailserver ready on port ${port}`)
})

server.on('error', hook.error)
