<template lang="pug">
  .page-users-username

    BContainer
      BRow
        Breadcrumbs(:crumbs="crumbs")
      BRow(fluid)
        BCol
          BForm(@submit.prevent="saveUser")
            BFormGroup(label="Username" label-for="username" label-cols="2")
              BFormInput(id="username" v-model="user.username")
            BFormGroup(label="Email Address" label-for="emailAddress" label-cols="2")
              BFormInput(id="emailAddress" type="email" v-model="user.emailAddress")
            BFormGroup(label="Email Address Verified?" label-for="hasVerifiedEmailAddress" label-cols="2")
              BFormCheckbox(id="hasVerifiedEmailAddress" v-model="user.hasVerifiedEmailAddress" disabled)
            BFormGroup(label="Last Logged In" label-for="lastLoggedIn" label-cols="2")
              BFormInput(id="username" v-model="lastLoggedIn" disabled)
            BFormGroup
              BButton(type="submit" variant="primary" :disabled="isSaving")
                span Save Changes
                BSpinner(v-if="isSaving" small)
</template>

<script>
export default {
  name: 'PageUsersUsername',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    isSaving: false,
    user: null,
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
        : 'User has not logged in yet!'
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
        const {
          data: { status },
        } = await this.$axios.patch(`/api/users/${this.user.id}`, this.user)
        if (status === 'success') {
          this.$bvToast.toast('User updated successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('Unable to update User - please try again.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.isSaving = false
      }
    },
  },
}
</script>
