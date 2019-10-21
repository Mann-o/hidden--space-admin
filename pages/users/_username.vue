<template lang="pug">
  .page-users-username
    Breadcrumbs(:crumbs="crumbs")

    BCardGroup(deck)
      BCard(header="Information" header-tag="h6")
        BForm(@submit.prevent="saveUser")
          BFormGroup(label="Username" label-for="username" label-cols="3")
            BFormInput(id="username" v-model="user.username")
          BFormGroup(label="Email Address" label-for="emailAddress" label-cols="3")
            BFormInput(id="emailAddress" type="email" v-model="user.emailAddress")
          BFormGroup(label="Email Address Verified" label-for="hasVerifiedEmailAddress" label-cols="3")
            BFormCheckbox(id="hasVerifiedEmailAddress" v-model="user.hasVerifiedEmailAddress" size="lg" style="margin-top:4px" disabled)
          BFormGroup(label="Last Logged In" label-for="lastLoggedIn" label-cols="3")
            BFormInput(id="username" v-model="lastLoggedIn" disabled plaintext)
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")

      BCard(header="Reset Password" header-tag="h6")
        BForm(@submit.prevent="resetPassword")
          BFormGroup(label="New Password" label-for="newPassword" label-cols="3")
            BFormInput(id="newPassword" v-model="resetPasswordForm.newPassword" disabled)
          BFormGroup(label="Re-enter New Password" label-for="newPasswordConfirmation" label-cols="3")
            BFormInput(id="newPasswordConfirmation" v-model="resetPasswordForm.newPasswordConfirmation" disabled)
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isResettingPassword" :loading="isResettingPassword" label="Save New Password" disabled)
          BAlert(variant="info" show) Functionality currently disabled, coming soon!
</template>

<script>
import handleError from '@/mixins/handle-error'
import handleSuccess from '@/mixins/handle-success'

export default {
  name: 'PageUsersUsername',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
  },

  mixins: [
    handleError,
    handleSuccess,
  ],

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
    crumbs () {
      return [
        { text: 'Users', to: '/users' },
        {
          text: this.user == null ? '' : this.user.username,
          active: true,
        },
      ]
    },
    lastLoggedIn () {
      return (this.user.lastLoggedIn != null)
        ? this.$options.filters.dateFormat(this.user.lastLoggedIn, 'dd/MM/yyyy - HH:mm')
        : 'N/A'
    },
  },

  async asyncData ({ app: { $axios }, params }) {
    const { data: user } = await $axios.get(`/api/users/${params.username}`)
    return { user }
  },

  methods: {
    async saveUser () {
      this.isSaving = true
      try {
        const { data: { status } } = await this.$axios.patch(`/api/users/${this.user.id}`, this.user)
        if (status !== 'success') {
          throw new Error('error')
        }
        handleSuccess('User updated successfully!')
      } catch (error) {
        handleError(error, 'Unable to update User - please try again.')
      } finally {
        this.isSaving = false
      }
    },
  },
}
</script>
