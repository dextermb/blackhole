const log = require('../log')
const providers = require('next-auth/providers')

exports.auth = {
  providers: {
    atlassian: providers.Atlassian,
    github: providers.GitHub,
    gitlab: providers.GitLab,
    google: providers.Google,
    slack: providers.Slack
  }
}

exports.terminateIfInvalidSettings = () => {
  const server = require('./server')
  const errors = []

  if (
    // If invalid auth provider given
    Object.keys(this.auth.providers).indexOf(process.env.AUTH_PROVIDER) === -1 ||
    // If no client ID or secret given
    !process.env.AUTH_CLIENT_ID || !process.env.AUTH_CLIENT_SECRET
  ) {
    errors.push('Invalid auth provider or no auth client ID/secret given')
  }

  if (!process.env.DATABASE_URL) {
    errors.push('Invalid database URL given')
  }

  if (errors.length) {
    server.close(() => {
      log.error('Invalid settings for webserver. Terminating.')

      for (let i = 0; i < errors.length; i++) {
        log.warn(errors[i])
      }

      process.exit(1)
    })
  }

  return errors.length > 0
}
