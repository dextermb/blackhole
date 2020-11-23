const hasUser = require('~/middleware/has-user')
const db = require('~/services/db')

const handler = async (req, res, user) => {
  const method = req.method.toLowerCase()
  const rules = db.get('rules')

  // Add rule
  if (method === 'post') {
    const { name, regexp } = JSON.parse(req.body)

    await rules.insert({
      name,
      regexp,
      ignore: true,
      created_by: user.email,
      created_at: +new Date(),
      modified_at: +new Date()
    })

    return res.end()
  }

  // Return all current items
  const items = await rules.find({})

  return res.json(items || [])
}

module.exports = hasUser(handler)
