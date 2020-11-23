const handler = (auth, session, callback) => {
  callback(null, { user: 1 })
}

module.exports = handler
