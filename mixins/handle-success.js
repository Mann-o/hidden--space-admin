export default {
  methods: {
    handleSuccess (successMessage) {
      this.$bvToast.toast(successMessage, {
        title: 'Success',
        autoHideDelay: 5000,
        variant: 'success',
      })
    },
  },
}
