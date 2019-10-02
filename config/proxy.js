// This ensures environment variables are available when
// nuxt.config.js is read
require('dotenv').config()

export default {
  '/api': {
    pathRewrite: {
      '^/api': '/api/v1/admin',
    },

    target:
      process.env.NODE_ENV === 'production'
        ? 'https://api.thehiddenspace.co.uk'
        : 'http://localhost:3333',

    headers: {
      'HiddenSpace-Api-Key': process.env.API_KEY,
    },
  },
}
