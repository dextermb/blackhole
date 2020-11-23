module.exports = {
  devIndicators: {
    autoPrerender: false
  },
  webpack: config => {
    const path = require('path')

    config.resolve.alias['~'] = path.resolve(__dirname)

    config.module.rules.push({
      test: /\.svg$/,
      issuer: { test: /\.jsx?$/ },
      use: ['@svgr/webpack']
    })

    return config
  },
  env: {
    AUTH_PROVIDER: process.env.AUTH_PROVIDER
  }
}
