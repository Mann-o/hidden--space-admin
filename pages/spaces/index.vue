<template lang="pug">
  .page-spaces-index
    Breadcrumbs(:crumbs="crumbs")

    .page-spaces-index__buttons
      BButton.mr-2(v-b-modal.new-space-modal variant="success") Create New Space
      SpinnerButton(
        @click="index()"
        :disabled="indexing"
        :loading="indexing"
        label="Refresh"
        label-when-loading="Refreshing"
      )

    BTable(
      id="spaces-table"
      :busy.sync="indexing"
      :fields="fields"
      :items="spaces"
      primary-key="slug"
      responsive="sm"
      :per-page="10"
      :current-page="currentPage"
      empty-text="No spaces found!"
      show-empty
      striped
      hover
      small
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching spaces...
      template(slot="cell(slug)" slot-scope="row")
        nuxt-link(:to="`/spaces/${row.item.slug}`") {{ row.item.slug }}
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton.mr-2(size="sm" :to="`/spaces/${row.item.slug}`" variant="primary") View
        BButton(size="sm" @click="destroy(row.item)" variant="danger") Delete

    BModal(id="new-space-modal" title="Create New Space" size="lg" @hidden="resetNewSpace")
      BForm
        BFormGroup(label="Slug" label-for="slug" label-cols="3" label-class="required-field")
          BFormInput(id="slug" v-model="newSpace.slug" :disabled="newSpaceSaving")
        BFormGroup(label="Property Number" label-for="propertyNumber" label-cols="3")
          BFormInput(id="propertyNumber" v-model="newSpace.propertyNumber" :disabled="newSpaceSaving")
        BFormGroup(label="Building Name" label-for="buildingName" label-cols="3")
          BFormInput(id="buildingName" v-model="newSpace.buildingName" :disabled="newSpaceSaving")
        BFormGroup(label="Street Address" label-for="streetAddress" label-cols="3" label-class="required-field")
          BFormInput(id="streetAddress" v-model="newSpace.streetAddress" :disabled="newSpaceSaving")
        BFormGroup(label="City" label-for="city" label-cols="3" label-class="required-field")
          BFormInput(id="city" v-model="newSpace.city" :disabled="newSpaceSaving")
      .w-100(slot="modal-footer")
        SpinnerButton.float-right(@click="saveNewSpace" :disabled="newSpaceSaving" :loading="newSpaceSaving")
        BButton.float-right.mr-2(@click="$bvModal.hide('new-space-modal')" :disabled="newSpaceSaving")
          span Cancel

    BPagination(
      v-if="spaces.length > 10"
      v-model="currentPage"
      :total-rows="spaces.length"
      :per-page="10"
      aria-controls="spaces-table"
    )
</template>

<script>
import BaseCrud from '@/mixins/crud/index'

export default {
  name: 'PageSpacesIndex',

  mixins: [BaseCrud('spaces')],

  data: () => ({
    fields: [
      { key: 'slug', sortable: true },
      { key: 'propertyNumber', sortable: true },
      { key: 'buildingName', sortable: true },
      { key: 'streetAddress', sortable: true },
      { key: 'city', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    newSpace: {
      slug: null,
      propertyNumber: null,
      buildingName: null,
      streetAddress: null,
      city: null,
    },
    newSpaceSaving: false,
  }),

  methods: {
    resetNewSpace () {
      this.newSpace = {
        slug: null,
        propertyNumber: null,
        buildingName: null,
        streetAddress: null,
        city: null,
      }
    },
    async saveNewSpace () {
      this.newSpaceSaving = true
      try {
        const {
          data: { status },
        } = await this.$axios.post('/api/spaces', this.newSpace)
        if (status === 'success') {
          this.$bvToast.toast('Space created successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
          this.$bvModal.hide('new-space-modal')
          this.index()
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast((
          (error.response && error.response.status === 422)
            ? error.response.data.errors[0].message
            : 'An error occured whilst trying to save this Space.'
        ), {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.newSpaceSaving = false
      }
    },
  },
}
</script>

<style lang="stylus">
@import '~assets/styles/core/mixins/bem'

.page-spaces-index

  +has(buttons)
    padding-bottom: 1rem
</style>
