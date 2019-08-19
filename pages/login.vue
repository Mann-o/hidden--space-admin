<template lang="pug">
  .page-login
    BCard(title="Login")
      h3(slot="header") Hidden Space
      BCardText Please enter your login credentials to access the administrative interface.
      BForm(@submit.prevent="onSubmit" @reset="onReset")
        BFormGroup(
          label="Login ID"
          label-for="loginId"
          description="This can be your username or email address"
        )
          BFormInput(id="loginId" v-model="credentials.loginId" placeholder="Enter Login ID")
        BFormGroup(label="Password" label-for="password")
          BFormInput(
            type="password"
            id="password"
            v-model="credentials.password"
            placeholder="Enter Password"
          )
        BButton(type="submit" variant="primary" :disabled="isLoggingIn")
          span Login
          BSpinner(v-if="isLoggingIn" small)
</template>

<script>
export default {
  name: 'PageLogin',

  layout: 'auth',

  data: () => ({
    credentials: {
      loginId: null,
      password: null,
    },
    isLoggingIn: false,
  }),

  methods: {
    onSubmit() {
      alert('submit')
    },
    onReset() {
      alert('reset')
    },
  },
}
</script>

<style lang="stylus">
.page-login
  max-width: 60rem
</style>
