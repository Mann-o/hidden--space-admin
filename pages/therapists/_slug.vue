<template lang="pug">
  .page-therapists-slug

    Breadcrumbs(:crumbs="crumbs")

    BCardGroup(deck)
      BCard(header="Information" header-tag="h6")
        BForm(@submit.prevent="save")
          BFormGroup(label="Slug" label-for="slug" label-cols="3")
            BFormInput(id="slug" v-model="therapist.slug")
          BFormGroup(label="Gender" label-for="gender" label-cols="3")
            BFormRadioGroup(style="margin-top:6px" id="gender" v-model="therapist.gender" :options="genderOptions")
          BFormGroup(label="Title" label-for="title" label-cols="3")
            BFormInput(id="title" v-model="therapist.title" required)
          BFormGroup(label="First Name(s)" label-for="firstNames" label-cols="3")
            BFormInput(id="firstNames" v-model="therapist.firstNames" required)
          BFormGroup(label="Last Name(s)" label-for="lastNames" label-cols="3")
            BFormInput(id="lastNames" v-model="therapist.lastNames" required)
          BFormGroup(label="Email Address" label-for="emailAddress" label-cols="3")
            BFormInput(id="emailAddress" type="email" v-model="therapist.emailAddress" required)
          BFormGroup(label="Telephone Number" label-for="telephoneNumber" label-cols="3")
            BFormInput(id="telephoneNumber" v-model="therapist.telephoneNumber")
          BFormGroup(label="Biography" label-for="biography" label-cols="3")
            quill(id="biography" v-model="therapist.biography" output="html" :config="quillConfig")
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")

      BCard(header="Media" header-tag="h6")
        BButton.mr-2(v-b-modal.browse-images-modal variant="success") Add Images
        BButton(variant="danger" v-if="hasImagesSelected" @click="removeSelectedImages") Remove ({{ selectedImagesCount }})
        Gallery(v-if="images.length" :items="images" @toggle="toggle" padded)
        BAlert.gallery__empty(v-else variant="warning" show) No images have been added yet!

    ModalGallery(
      title="Select Images"
      :exclude="images"
      @ok="addSelectedImages"
    )
</template>

<script>
import update from '@/mixins/crud/update'

export default {
  name: 'PageTherapistsSlug',

  mixins: [update('therapist', 'slug', 'fullNameWithTitle')],

  data: () => ({
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
    genderOptions: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
  }),
}
</script>

<style lang="stylus">
@import '~assets/styles/core/mixins/bem'

.gallery
  .alert
    margin-bottom: 0

  +has(empty)
    margin-top: 1.4rem
</style>
