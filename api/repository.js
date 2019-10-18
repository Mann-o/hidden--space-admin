export default ($axios) => (resource) => ({
  index () {
    return $axios.get(`/api/${resource}`)
  },

  create (payload) {
    return $axios.post(`/api/${resource}`, payload)
  },

  show (identifier) {
    return $axios.get(`/api/${resource}/${identifier}`)
  },

  update (identifier, payload) {
    return $axios.patch(`/api/${resource}/${identifier}`, payload)
  },

  delete (identifier) {
    return $axios.delete(`/api/${resource}/${identifier}`)
  },

  addImages (identifier, payload) {
    return $axios.post(`/api/${resource}/${identifier}/images`, payload)
  },

  removeImages (identifier, payload) {
    return $axios.post(`/api/${resource}/${identifier}/images/remove`, payload)
  },
})
