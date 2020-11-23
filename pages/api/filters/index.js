const hasUser = require('~/middleware/has-user')
const db = require('~/services/db')

const handler = async (req, res, user) => {
  const method = req.method.toLowerCase()
  const filters = db.get('filters')

  // Add filter
  if (method === 'post') {
    const { name, regexp, replacement } = JSON.parse(req.body)

    await filters.insert({
      name,
      regexp,
      replacement,
      created_by: user.email,
      created_at: +new Date(),
      modified_at: +new Date()
    })

    return res.end()
  }

  // Return all current items
  const items = await filters.find({})

  return res.json(items || [])
}

module.exports = hasUser(handler)
