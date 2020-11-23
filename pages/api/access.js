const hasUser = require('~/middleware/has-user')
const db = require('~/services/db')

const handler = async (req, res, user) => {
  const method = req.method.toLowerCase()
  const access = db.get('access')

  // Add email address to access
  if (method === 'post') {
    const { email } = JSON.parse(req.body)

    await access.insert({
      email,
      created_by: user.email,
      created_at: +new Date()
    })

    return res.json(req.body)
  }

  // Remove email address from access
  if (method === 'delete') {
    const { id } = JSON.parse(req.body)

    await access.remove({ _id: id })

    return res.status(204).end()
  }

  // Return all current items
  const items = await access.find({})

  return res.json(items || [])
}

module.exports = hasUser(handler)
