<template lang="pug">
  .page-users-username
    Breadcrumbs(:crumbs="crumbs")

    BCardGroup(deck)
      BCard(header="Information" header-tag="h6")
        BForm(@submit.prevent="save")
          BFormGroup(label="Username" label-for="username" label-cols="3")
            BFormInput(id="username" v-model="user.username")
          BFormGroup(label="Email Address" label-for="emailAddress" label-cols="3")
            BFormInput(id="emailAddress" type="email" v-model="user.emailAddress")
          BFormGroup(label="Email Address Verified" label-for="hasVerifiedEmailAddress" label-cols="3")
            BFormCheckbox(id="hasVerifiedEmailAddress" v-model="user.hasVerifiedEmailAddress" size="lg" style="margin-top:4px")
          BFormGroup(label="Last Logged In" label-for="lastLoggedIn" label-cols="3")
            BFormInput(id="username" v-model="lastLoggedIn" disabled plaintext)
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")

      BCard(header="Reset Password" header-tag="h6")
        BForm(@submit.prevent="resetPassword")
          BFormGroup(label="New Password" label-for="newPassword" label-cols="3")
            BFormInput(id="newPassword" v-model="resetPasswordForm.newPassword")
          BFormGroup(label="Re-enter New Password" label-for="newPasswordConfirmation" label-cols="3")
            BFormInput(id="newPasswordConfirmation" v-model="resetPasswordForm.newPasswordConfirmation")
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isResettingPassword" :loading="isResettingPassword" label="Save New Password")
          //- BAlert(variant="info" show) Functionality currently disabled, coming soon!
</template>

<script>
import update from '@/mixins/crud/update'

export default {
  name: 'PageUsersUsername',

  mixins: [update('user', 'username', 'id', 'username')],

  data: () => ({
    user: null,
    resetPasswordForm: {
      newPassword: null,
      newPasswordConfirmation: null,
    },
    isSaving: false,
    isResettingPassword: false,
  }),

  computed: {
    lastLoggedIn () {
      return (this.user.lastLoggedIn != null)
        ? this.$options.filters.dateFormat(this.user.lastLoggedIn, 'dd/MM/yyyy - HH:mm')
        : 'N/A'
    },
  },

  methods: {
    async resetPassword () {
      if (this.resetPasswordForm.newPassword !== this.resetPasswordForm.newPasswordConfirmation) {
        this.$bvToast.toast('New password fields do not match', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } else {
        this.isResettingPassword = true
        const { data: { status, message } } = await this.$axios.post(`/api/users/${this.user.id}/reset-password`, this.resetPasswordForm)
        this.isResettingPassword = false
        this.$bvToast.toast(
          (status === 'success' ? 'Password changed successfully' : message),
          {
            title: status.charAt(0).toUpperCase() + status.slice(1),
            autoHideDelay: 5000,
            variant: status === 'success' ? 'success' : 'danger',
          },
        )
        if (status === 'success') {
          this.resetPasswordForm.newPassword = null
          this.resetPasswordForm.newPasswordConfirmation = null
        }
      }
    },
  },
}
</script>
