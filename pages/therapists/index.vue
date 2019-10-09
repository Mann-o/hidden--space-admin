<template lang="pug">
  .page-therapists-index
    Breadcrumbs(:crumbs="crumbs")
    .page-therapists-index__buttons
      BButton.mr-2(v-b-modal.new-therapist-modal variant="primary") Create New Therapist
      BButton(@click="getTherapists()" variant="primary") Refresh

    BTable(
      :busy.sync="loadingTherapists"
      :fields="fields"
      :items="therapists"
      primary-key="slug"
      responsive="sm"
      empty-text="No therapists found!"
      show-empty
      striped
      small
      hover
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching therapists...
      template(slot="cell(slug)" slot-scope="row")
        nuxt-link(:to="`/therapists/${row.item.slug}`") {{ row.item.slug }}
      template(slot="cell(gender)" slot-scope="row")
        span {{ row.item.gender.charAt(0).toUpperCase() + row.item.gender.slice(1) }}
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
          BButton.mr-2(size="sm" :to="`/therapists/${row.item.slug}`" variant="primary") View
          BButton(size="sm" @click="deleteTherapist(row.item)" variant="danger") Delete

    BModal(id="new-therapist-modal" title="Create New Therapist" size="lg" @hidden="resetNewTherapist" scrollable)
      BForm
        BFormGroup(label="Slug" label-for="slug" label-cols="3")
          BFormInput(id="slug" v-model="newTherapist.slug" required)
        BFormGroup(label="Gender" label-for="gender" label-cols="3")
          BFormSelect(id="gender" v-model="newTherapist.gender" required)
            option(value="male") Male
            option(value="female") Female
        BFormGroup(label="Title" label-for="title" label-cols="3")
          BFormInput(id="title" v-model="newTherapist.title" required)
        BFormGroup(label="First Name(s)" label-for="firstNames" label-cols="3")
          BFormInput(id="firstNames" v-model="newTherapist.firstNames" required)
        BFormGroup(label="Last Name(s)" label-for="lastNames" label-cols="3")
          BFormInput(id="lastNames" v-model="newTherapist.lastNames" required)
        BFormGroup(label="Email Address" label-for="emailAddress" label-cols="3")
          BFormInput(id="emailAddress" type="email" v-model="newTherapist.emailAddress" required)
        BFormGroup(label="Telephone Number" label-for="telephoneNumber" label-cols="3")
          BFormInput(id="telephoneNumber" v-model="newTherapist.telephoneNumber")
        BFormGroup(label="Profile Image" label-for="imageId" label-cols="3")
          img(v-if="selectedImage != null" :src="selectedImage.url" style="max-width:4rem;max-height:4rem;margin-right:2rem" @click="selectedImage = null")
          BButton(v-b-modal.browse-images-modal variant="primary") {{ selectedImage != null ? 'Change' : 'Browse' }}...
          BFormInput(id="imageId" v-model="newTherapist.imageId" hidden)
        BFormGroup(label="Biography" label-for="biography" label-cols="3")
          quill(id="biography" v-model="newTherapist.biography" output="html" :config="quillConfig")
      .w-100(slot="modal-footer")
        BButton.float-right(@click="saveNewTherapist" variant="primary" :disabled="newTherapistSaving")
          span {{ newTherapistSaving ? 'Saving' : 'Save' }}
          BSpinner(v-if="newTherapistSaving" small)
        BButton.float-right.mr-2(@click="$bvModal.hide('new-therapist-modal')" :disabled="newTherapistSaving")
          span Cancel

    ModalGallery(title="Select Therapist Profile Image" :selected="selectedImageId" @select="selectImage")
</template>

<script>
export default {
  name: 'PageTherapistsIndex',

  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    ModalGallery: () => import('@/components/ModalGallery'),
  },

  data: () => ({
    crumbs: [{ text: 'Therapists', active: true }],
    fields: [
      { key: 'slug', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'title', sortable: true },
      { key: 'firstNames', sortable: true },
      { key: 'lastNames', sortable: true },
      { key: 'gender', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'telephoneNumber', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    therapists: [],
    newTherapist: {
      slug: null,
      gender: 'male',
      title: null,
      firstNames: null,
      lastNames: null,
      emailAddress: null,
      telephoneNumber: null,
      biography: null,
      imageId: null,
    },
    newTherapistSaving: false,
    quillConfig: {
      placeholder: 'Enter some text describing this Therapist',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
      theme: 'bubble',
    },
    selectedImage: null,
    loadingTherapists: false,
  }),

  computed: {
    selectedImageId () {
      return (this.selectedImage != null) ? this.selectedImage.id : null
    },
  },

  async asyncData ({ app: { $axios } }) {
    const { data: therapists } = await $axios.get('/api/therapists')
    return { therapists }
  },

  methods: {
    async getTherapists () {
      this.loadingTherapists = true
      this.therapists = []
      const { data: therapists } = await this.$axios.get('/api/therapists')
      this.therapists = therapists
      this.loadingTherapists = false
    },
    async deleteTherapist (therapist) {
      const doDelete = await this.$bvModal.msgBoxConfirm(
        `Are you sure you wish to delete this Therapist? This operation is irreversible!`,
        {
          title: 'Delete Therapist?',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideHeaderClose: true,
          centered: true,
        }
      )
      if (doDelete) {
        const { data: { status } } = await this.$axios.delete(`/api/therapists/${therapist.slug}`)
        if (status === 'success') {
          this.getTherapists()
          this.$bvToast.toast('Therapist deleted successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        }
      }
    },
    async saveNewTherapist () {
      try {
        this.newTherapistSaving = true
        const { data: { status } } = await this.$axios.post('/api/therapists', this.newTherapist)
        if (status === 'success') {
          this.$bvToast.toast('Therapist created successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
          this.$bvModal.hide('new-therapist-modal')
          this.getTherapists()
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('An error occurred whilst trying to save this Therapist.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.newTherapistSaving = false
      }
    },
    selectImage (image) {
      this.selectedImage = image
      this.newTherapist.image_id = image.id
    },
    resetNewTherapist () {
      this.newTherapist = {
        slug: null,
        gender: 'male',
        title: null,
        firstNames: null,
        lastNames: null,
        emailAddress: null,
        telephoneNumber: null,
        biography: null,
        imageId: null,
      }
      this.selectedImage = null
    },
  },
}
</script>

<style lang="stylus">
@import '~assets/styles/core/mixins/bem'

.page-therapists-index

  +has(buttons)
    padding-bottom: 1rem
</style>
