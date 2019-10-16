export default ($auth) => ({
  login (payload) {
    return $auth.loginWith('local', payload)
  },
})
