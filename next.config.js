if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/home',
            permanent: true,
          },
        ]
      },
    env: {
      API_URL: process.env.API_URL,
    }
}