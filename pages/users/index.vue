<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")
    BTable(
      v-if="users.length"
      :fields="fields"
      :items="users"
      primary-key="username"
      responsive="sm"
      striped
      hover
    )
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton(size="sm" :to="`/users/${row.item.username}`") View
</template>

<script>
export default {
  name: 'PageUsersIndex',

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
}
</script>
