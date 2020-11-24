const hasUser = require('~/middleware/has-user')
const db = require('~/services/db')

const handler = async (req, res) => {
  const filters = db.get('filters')
  const method = req.method.toLowerCase()
  const { id } = req.query

  // Update filter
  if (method === 'patch') {
    const { name, regexp, replacement, type } = JSON.parse(req.body)

    await filters.update(
      { _id: id },
      {
        $set: {
          name,
          regexp,
          replacement,
          type,
          modified_at: +new Date()
        }
      }
    )

    return res.end()
  }

  // Remove filter
  if (method === 'delete') {
    await filters.remove({ _id: id })

    return res.status(204).end()
  }

  // Return current filter
  const filter = await filters.findOne({ _id: id })

  return res.json(filter)
}

module.exports = hasUser(handler)
