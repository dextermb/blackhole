const db = require('monk')(process.env.DATABASE_URL)

module.exports = db
