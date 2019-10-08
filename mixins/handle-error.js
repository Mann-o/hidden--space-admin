export default {
  methods: {
    handle422 (error, fallbackErrorMessage) {
      this.$bvToast.toast((
        (error.response && error.response.status === 422)
          ? error.response.data.errors[0].message
          : fallbackErrorMessage
      ), {
        title: 'Error',
        autoHideDelay: 5000,
        variant: 'danger',
      })
    },
  },
}
