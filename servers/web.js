// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url')
const next = require('next')

const dev = require('../utilities/is-dev')
const log = require('../utilities/log')
const settings = require('../utilities/web/settings')

const app = next({ dev })
const handle = app.getRequestHandler()
const port = 80

log.info('Starting webserver')

if (!settings.terminateIfInvalidSettings()) {
  app.prepare().then(() => {
    const server = require('../utilities/web/server')

    server.on('request', (req, res) => {
      handle(req, res, parse(req.url, true))
    })

    server.listen(port, (err) => {
      if (err) throw err
      log.ready(`Webserver ready on port ${port}`)
    })
  })
}
