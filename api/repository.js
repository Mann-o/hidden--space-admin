export default ($axios) => (resource) => ({
  index () {
    return $axios.get(`/api/${resource}`)
  },

  create (payload) {
    return $axios.post(`/api/${resource}`, payload)
  },

  show (id) {
    return $axios.get(`/api/${resource}/${id}`)
  },

  update (id) {
    return $axios.patch(`/api/${resource}/${id}`)
  },

  delete (id) {
    return $axios.delete(`/api/${resource}/${id}`)
  },
})
