<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")

    .page-users-index__buttons
      BButton.mr-2(v-b-modal.new-user-modal variant="success") Create New User
      SpinnerButton(
        @click="index()"
        :disabled="indexing || deleting"
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
      template(slot="cell(lastLoggedIn)" slot-scope="row")
        span(v-if="row.item.lastLoggedIn != null") {{ row.item.lastLoggedIn | dateFormat('dd/MM/yyyy - HH:mm') }}
        span(v-else) -
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton.mr-2(size="sm" :to="`/users/${row.item.username}`" variant="primary" :disabled="deleting") View
        BButton(@click="destroy(row.item)" size="sm" variant="danger" :disabled="deleting") Delete

    BModal(id="new-user-modal" title="Create New User" size="lg" @hidden="resetNewUser" scrollable)
      BForm
        BFormGroup(label="Username" label-for="username" label-cols="3" label-class="required-field")
          BFormInput(id="username" v-model="newUser.username" required)
        BFormGroup(label="Email Address" label-for="emailAddress" label-cols="3" label-class="required-field")
          BFormInput(type="email" id="emailAddress" v-model="newUser.emailAddress" required)
        BFormGroup(label="Password" label-for="password" label-cols="3" label-class="required-field")
          BFormInput(type="password" id="password" v-model="newUser.password" required)
        BFormGroup(label="Re-enter Password" label-for="passwordConfirmation" label-cols="3" label-class="required-field")
          BFormInput(type="password" id="passwordConfirmation" v-model="newUser.passwordConfirmation" required)
      .w-100(slot="modal-footer")
        SpinnerButton.float-right(@click="saveNewUser()" :disabled="newUserSaving" :loading="newUserSaving")
        BButton.float-right.mr-2(@click="$bvModal.hide('new-user-modal')" :disabled="newUserSaving")
          span Cancel
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
      { key: 'lastLoggedIn', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    newUser: {
      username: null,
      emailAddress: null,
      password: null,
      passwordConfirmation: null,
    },
    newUserSaving: false,
  }),

  methods: {
    async saveNewUser () {
      try {
        this.newUserSaving = true
        const { data: { status } } = await this.$axios.post('/api/users', this.newUser)
        if (status === 'success') {
          this.$bvToast.toast('User created successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
          this.$bvModal.hide('new-user-modal')
          this.index()
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('An error occurred whilst trying to save this User.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.newUserSaving = false
      }
    },
    resetNewUser () {
      this.newUser = {
        username: null,
        emailAddress: null,
        password: null,
        passwordConfirmation: null,
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
