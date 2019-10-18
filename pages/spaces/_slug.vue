<template lang="pug">
  .page-spaces-slug

    Breadcrumbs(:crumbs="crumbs")

    BCardGroup(deck)
      BCard(header="Information" header-tag="h6")
        BForm(@submit.prevent="save")
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
          BFormGroup(label-cols="2")
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
  name: 'PageSpacesSlug',

  mixins: [update('space', 'slug', 'address')],
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
