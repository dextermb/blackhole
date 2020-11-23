const chalk = require('chalk')

const prefixes = {
  wait: chalk.cyan('wait') + '  -',
  error: chalk.red('error') + ' -',
  warn: chalk.yellow('warn') + '  -',
  ready: chalk.green('ready') + ' -',
  info: chalk.cyan('info') + '  -',
  event: chalk.magenta('event') + ' -'
}

exports.wait = (...message) => console.log(prefixes.wait, ...message)
exports.error = (...message) => console.log(prefixes.error, ...message)
exports.warn = (...message) => console.log(prefixes.warn, ...message)
exports.ready = (...message) => console.log(prefixes.ready, ...message)
exports.info = (...message) => console.log(prefixes.info, ...message)
exports.event = (...message) => console.log(prefixes.event, ...message)
