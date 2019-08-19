export default ({ app: { $auth, $axios } }) => {
  // Request interceptor
  $axios.onRequest((config) => {
    // Not used for anything yet - maybe later!
    return config
  })

  // Response interceptor
  $axios.onResponse((response) => {
    // nothing yet
    return response
  })

  // Error interceptor
  $axios.onError((err) => {
    return Promise.reject(err)
  })
}
