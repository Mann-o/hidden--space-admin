export default {
  redirect: {
    login: '/login',
    logout: '/login',
    home: '/spaces',
  },

  token: {
    prefix: 'token.',
  },

  localStorage: false,

  cookie: {
    name: '_hiddenspace_auth.',
    prefix: '_hiddenspace_auth.',
    options: {
      secure: (process.env.NODE_ENV === 'production'),
    },
  },

  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/api/auth/login',
          method: 'post',
          propertyName: 'payload.token',
        },
        user: {
          url: '/api/auth/me',
          method: 'get',
          propertyName: 'user',
        },
        logout: false,
      },
    },
  },

  plugins: [{ src: '@/plugins/axios' }],
}
