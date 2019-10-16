<template lang="pug">
  .page-spaces-slug

    BContainer
      BRow
        Breadcrumbs(:crumbs="crumbs")
      BRow(fluid)
        BCol
          BForm(@submit.prevent="saveSpace")
            BFormGroup(label="Slug" label-for="slug" label-cols="2")
              BFormInput(id="slug" v-model="space.slug")
            BFormGroup(label="Property Number" label-for="propertyNumber" label-cols="2")
              BFormInput(id="propertyNumber" v-model="space.propertyNumber")
            BFormGroup(label="Building Name" label-for="buildingName" label-cols="2")
              BFormInput(id="buildingName" v-model="space.buildingName")
            BFormGroup(label="Street Address" label-for="streetAddress" label-cols="2")
              BFormInput(id="streetAddress" v-model="space.streetAddress")
            BFormGroup(label="City" label-for="city" label-cols="2")
              BFormInput(id="city" v-model="space.city")
            BFormGroup
              SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")
</template>

<script>
export default {
  name: 'PageSpacesSlug',

  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
  },

  data: () => ({
    isSaving: false,
    space: null,
  }),

  computed: {
    crumbs () {
      return [
        { text: 'Spaces', to: '/spaces' },
        {
          text: this.space == null ? '' : this.space.address,
          active: true,
        },
      ]
    },
  },

  async asyncData ({ app: { $axios }, params }) {
    const { data: space } = await $axios.get(`/api/spaces/${params.slug}`)
    return { space }
  },

  methods: {
    async saveSpace () {
      this.isSaving = true
      try {
        const {
          data: { status },
        } = await this.$axios.patch(`/api/spaces/${this.space.id}`, this.space)
        if (status === 'success') {
          this.$bvToast.toast('Space updated successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('Unable to update Space - please try again.', {
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
