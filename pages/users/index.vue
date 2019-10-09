<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")

    .page-users-index__buttons
      BButton(@click="getUsers()" variant="primary") Refresh

    BTable(
      :busy.sync="loadingUsers"
      :fields="fields"
      :items="users"
      primary-key="username"
      responsive="sm"
      empty-text="No users found!"
      show-empty
      striped
      hover
      small
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching users...
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton.mr-2(size="sm" :to="`/users/${row.item.username}`" variant="primary") View
        BButton(@click="deleteUser(row.item)" size="sm" variant="danger") Delete
</template>

<script>
export default {
  name: 'PageUsersIndex',

  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Users', active: true }],
    fields: [
      { key: 'username', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    users: [],
    loadingUsers: false,
  }),

  async asyncData ({ app: { $axios } }) {
    const { data: users } = await $axios.get('/api/users')
    return { users }
  },

  methods: {
    async getUsers () {
      this.loadingUsers = true
      this.users = []
      const { data: users } = await this.$axios.get('/api/users')
      this.users = users
      this.loadingUsers = false
    },
    async deleteUser (user) {
      const doDelete = await this.$bvModal.msgBoxConfirm(
        `Are you sure you wish to delete this User? This operation is irreversible!`,
        {
          title: 'Delete User?',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideHeaderClose: true,
          centered: true,
        }
      )
      if (doDelete) {
        const { data: { status } } = await this.$axios.delete(`/api/users/${user.id}`)
        if (status === 'success') {
          this.getUsers()
          this.$bvToast.toast('Therapist deleted successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.page-users-index

  +has(buttons)
    padding-bottom: 1rem
</style>
