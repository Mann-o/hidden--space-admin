<template lang="pug">
  .page-spaces-index
    Breadcrumbs(:crumbs="crumbs")
    BButton(v-b-modal.new-space-modal variant="primary") New Space
    BTable(
      v-if="spaces.length"
      :fields="fields"
      :items="spaces"
      primary-key="slug"
      responsive="sm"
      striped
      hover
      small
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong Loading...
      template(slot="cell(slug)" slot-scope="row")
        nuxt-link(:to="`/spaces/${row.item.slug}`") {{ row.item.slug }}
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButtonGroup
          BButton(size="sm" :to="`/spaces/${row.item.slug}`" variant="primary") View
          BButton(size="sm" @click="deleteSpace(row.item)" variant="danger") Delete

    BModal(id="new-space-modal" title="New Space" size="lg")
      BForm
        BFormGroup(label="Slug" label-for="slug" label-cols="3")
          BFormInput(id="slug" v-model="newSpace.slug")
        BFormGroup(label="Property Number" label-for="propertyNumber" label-cols="3")
          BFormInput(id="propertyNumber" v-model="newSpace.propertyNumber")
        BFormGroup(label="Building Name" label-for="buildingName" label-cols="3")
          BFormInput(id="buildingName" v-model="newSpace.buildingName")
        BFormGroup(label="Street Address" label-for="streetAddress" label-cols="3")
          BFormInput(id="streetAddress" v-model="newSpace.streetAddress")
        BFormGroup(label="City" label-for="city" label-cols="3")
          BFormInput(id="city" v-model="newSpace.city")
      .w-100(slot="modal-footer")
        BButton.float-right(@click="saveNewSpace" variant="primary" :disabled="newSpaceSaving")
          span {{ newSpaceSaving ? 'Saving' : 'Save' }}
          BSpinner(v-if="newSpaceSaving" small)
</template>

<script>
export default {
  name: 'PageSpacesIndex',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Spaces', active: true }],
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
    spaces: [],
    isLoading: false,
    newSpace: {
      slug: null,
      propertyNumber: null,
      buildingName: null,
      streetAddress: null,
      city: null,
    },
    newSpaceSaving: false,
  }),

  async asyncData ({ app: { $axios } }) {
    const { data: spaces } = await $axios.get('/api/spaces')
    return { spaces }
  },

  methods: {
    async getSpaces () {
      this.spaces = []
      const { data: spaces } = await this.$axios.get('/api/spaces')
      this.spaces = spaces
    },
    async deleteSpace (space) {
      const doDelete = await this.$bvModal.msgBoxConfirm(
        `Are you sure you wish to delete this Space? This operation is irreversible!`,
        {
          title: 'Delete Space?',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideHeaderClose: true,
          centered: true,
        }
      )
      if (doDelete) {
        const {
          data: { status },
        } = await this.$axios.delete(`/api/spaces/${space.slug}`)
        if (status === 'success') {
          this.getSpaces()
          this.$bvToast.toast('Space deleted successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        }
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
          this.getSpaces()
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('An error occured whilst trying to save this Space.', {
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
