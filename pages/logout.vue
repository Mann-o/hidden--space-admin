<template lang="pug">
  .page-logout
    p Please wait whilst you are logged out...
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageLogout',

  transition: 'fade',

  mounted () {
    this.updateLoginId(null)
    this.updatePassword(null)
    this.stopLoading()
    this.$auth.logout()
  },

  methods: {
    ...mapActions('login', [
      'updateLoginId',
      'updatePassword',
      'stopLoading',
    ]),
  },
}
</script>
