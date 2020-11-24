const handler = (auth, session, callback) => {
  callback(null, { user: auth.username })
}

module.exports = handler
