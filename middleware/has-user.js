const { getSession } = require('next-auth/client')

const hasUser = handler => async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    return handler(req, res, session.user)
  }

  return res.status(401).end()
}

module.exports = hasUser
