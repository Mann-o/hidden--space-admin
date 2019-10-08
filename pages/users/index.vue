<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")

    .page-users-index__buttons
      BButton(@click="getUsers()" variant="primary") Refresh

    BTable(
      :busy.sync="!users.length"
      :fields="fields"
      :items="users"
      primary-key="username"
      responsive="sm"
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
        BButton(size="sm" :to="`/users/${row.item.username}`" variant="primary") View
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
  }),

  async asyncData ({ app: { $axios } }) {
    const { data: users } = await $axios.get('/api/users')
    return { users }
  },

  methods: {
    async getUsers () {
      this.users = []
      const { data: users } = await this.$axios.get('/api/users')
      this.users = users
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
