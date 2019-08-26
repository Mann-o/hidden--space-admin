<template lang="pug">
  .page-therapists-slug

    BContainer
      BRow
        Breadcrumbs(:crumbs="crumbs")
      BRow(fluid)
        BCol
          BForm(@submit.prevent="saveTherapist")
            BFormGroup(label="Slug" label-for="slug" label-cols="2")
              BFormInput(id="slug" v-model="therapist.slug")
            BFormGroup(label="Gender" label-for="gender" label-cols="2")
              BFormSelect(id="gender" v-model="therapist.gender" required)
                option(value="male") Male
                option(value="female") Female
            BFormGroup(label="Title" label-for="title" label-cols="2")
              BFormInput(id="title" v-model="therapist.title" required)
            BFormGroup(label="First Name(s)" label-for="firstNames" label-cols="2")
              BFormInput(id="firstNames" v-model="therapist.firstNames" required)
            BFormGroup(label="Last Name(s)" label-for="lastNames" label-cols="2")
              BFormInput(id="lastNames" v-model="therapist.lastNames" required)
            BFormGroup(label="Email Address" label-for="emailAddress" label-cols="2")
              BFormInput(id="emailAddress" type="email" v-model="therapist.emailAddress" required)
            BFormGroup(label="Telephone Number" label-for="telephoneNumber" label-cols="2")
              BFormInput(id="telephoneNumber" v-model="therapist.telephoneNumber")
            BFormGroup(label="Profile Image" label-for="imageId" label-cols="2")
              tempate(v-if="therapist.image != null")
                img(:src="therapist.image.url" style="max-width:4rem;max-height:4rem;margin-right:2rem" @click="therapist.image = null")
                BButton(v-b-modal.browse-images-modal variant="primary") {{ therapist.image != null ? 'Change' : 'Browse' }}...
              template(v-if="therapist.image == null")
                img(v-if="selectedImage != null" :src="selectedImage.url" style="max-width:4rem;max-height:4rem;margin-right:2rem" @click="selectedImage = null")
                BButton(v-b-modal.browse-images-modal variant="primary") {{ selectedImage != null ? 'Change' : 'Browse' }}...
              BFormInput(id="imageId" v-model="therapist.imageId" hidden)
            BFormGroup(label="Biography" label-for="biography" label-cols="2")
              quill(id="biography" v-model="therapist.biography" output="html" :config="quillConfig")
            BFormGroup
              BButton(type="submit" variant="primary" :disabled="isSaving")
                span Save Changes
                BSpinner(v-if="isSaving" small)

    ModalGallery(title="Select Therapist Profile Image" :selected="selectedImageId" @select="selectImage")
</template>

<script>
export default {
  name: 'PageTherapistsSlug',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    ModalGallery: () => import('@/components/ModalGallery'),
  },

  data: () => ({
    therapist: null,
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
    isSaving: false,
  }),

  computed: {
    crumbs () {
      return [
        { text: 'Therapists', to: '/therapists' },
        {
          text: this.therapist == null ? '' : this.therapist.fullNameWithTitle,
          active: true,
        },
      ]
    },
    selectedImageId () {
      return (this.selectedImage) == null ? null : this.selectedImage.id
    },
  },

  async asyncData ({ app: { $axios }, params }) {
    const { data: therapist } = await $axios.get(`/api/therapists/${params.slug}`)
    return { therapist }
  },

  methods: {
    async saveTherapist () {
      this.isSaving = true
      try {
        const {
          data: { status },
        } = await this.$axios.patch(`/api/therapists/${this.therapist.id}`, this.therapist)
        if (status === 'success') {
          this.$bvToast.toast('Therapist updated successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('Unable to update Therapist - please try again.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.isSaving = false
      }
    },
    selectImage (image) {
      this.selectedImage = image
      this.therapist.image = image
      this.therapist.imageId = image.id
    },
  },
}
</script>
