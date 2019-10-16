<template lang="pug">
  .page-login
    BCard(title="Login")
      h3(slot="header") Hidden Space
      BCardText Please enter your login credentials to access the administrative interface.
      BForm(@submit.prevent="doLogin()")
        BFormGroup(
          label="Login ID"
          label-for="loginId"
          description="This can be your username or email address"
        )
          BFormInput(
            id="loginId"
            :value="credentials.loginId"
            @input="updateLoginId"
            placeholder="Enter Login ID"
            :disabled="isLoggingIn"
          )
        BFormGroup(label="Password" label-for="password")
          BFormInput(
            type="password"
            id="password"
            :value="credentials.password"
            @input="updatePassword"
            placeholder="Enter Password"
            :disabled="isLoggingIn"
          )
        SpinnerButton(
          type="submit"
          :loading="isLoggingIn"
          :disabled="isLoggingIn"
          label="Login"
          label-when-loading="Logging in"
        )
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageLogin',

  layout: 'auth',

  transition: 'fade',

  components: {
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
  },

  computed: {
    ...mapState('login', [
      'credentials',
      'isLoggingIn',
    ]),
  },

  methods: {
    ...mapActions('login', [
      'updateLoginId',
      'updatePassword',
      'startLoading',
      'stopLoading',
    ]),
    async doLogin () {
      this.startLoading()
      try {
        await this.$api.auth.login({ data: this.credentials })
      } catch (error) {
        this.$bvToast.toast('Invalid Login ID and/or password, please try again.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
        this.stopLoading()
      }
    },
    onReset () {
      alert('reset')
    },
  },
}
</script>

<style lang="stylus">
.page-login
  max-width: 60rem
</style>
