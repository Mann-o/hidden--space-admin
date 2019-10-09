<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")

    .page-users-index__buttons
      BButton.mr-2(v-b-modal.new-user-modal variant="success") Create New User
      SpinnerButton(
        @click="index()"
        :disabled="indexing"
        :loading="indexing"
        label="Refresh"
        label-when-loading="Refreshing"
      )

    BTable(
      :busy.sync="indexing"
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
        BButton(@click="destroy(row.item)" size="sm" variant="danger") Delete
</template>

<script>
import index from '@/mixins/crud/index'

export default {
  name: 'PageUsersIndex',

  mixins: [index('users')],

  data: () => ({
    fields: [
      { key: 'username', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
  }),
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.page-users-index

  +has(buttons)
    padding-bottom: 1rem
</style>
