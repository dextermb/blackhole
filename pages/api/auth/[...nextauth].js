const auth = require('next-auth').default

const settings = require('~/utilities/web/settings')
const db = require('~/services/db')

const options = {
  providers: [
    settings.auth.providers[process.env.AUTH_PROVIDER]({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET
    })
  ],

  pages: {
    signIn: '/',
    error: '/error'
  },

  callbacks: {
    signIn: async ({ email }) => {
      const users = db.get('users')
      const access = db.get('access')

      // If first user is signed in then add them to the access list and continue.
      if (await users.count() === 0) {
        await access.insert({
          email,
          created_by: 'system',
          created_at: +new Date()
        })

        return Promise.resolve(true)
      }

      // If access has not been granted to email address then reject them.
      if (await access.count({ email }) === 0) {
        return Promise.resolve(false)
      }

      // Allow the user to sign in.
      return Promise.resolve(true)
    }
  },

  database: process.env.DATABASE_URL
}

module.exports = (req, res) => auth(req, res, options)
