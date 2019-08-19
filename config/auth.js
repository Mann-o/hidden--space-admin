export default {
  redirect: {
    login: '/login',
    logout: '/login',
    home: '/spaces',
  },

  token: {
    prefix: '_hiddenspace_token.',
  },

  localStorage: false,

  cookies: {
    name: '_hiddenspace_auth.',
    prefix: '_hiddenspace_auth.',
    options: {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
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
          url: '/api/auth/user',
          method: 'get',
          propertyName: 'user',
        },
        logout: false,
      },
    },
  },

  plugins: [{ src: '@/plugins/axios' }],
}
