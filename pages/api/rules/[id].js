const hasUser = require('~/middleware/has-user')
const db = require('~/services/db')

const handler = async (req, res) => {
  const rules = db.get('rules')
  const method = req.method.toLowerCase()
  const { id } = req.query

  // Update rule
  if (method === 'patch') {
    const { name, regexp, type } = JSON.parse(req.body)

    await rules.update(
      { _id: id },
      {
        $set: {
          name,
          regexp,
          type,
          modified_at: +new Date()
        }
      }
    )

    return res.end()
  }

  // Remove rule
  if (method === 'delete') {
    await rules.remove({ _id: id })

    return res.status(204).end()
  }

  // Return current rule
  const rule = await rules.findOne({ _id: id })

  return res.json(rule)
}

module.exports = hasUser(handler)
