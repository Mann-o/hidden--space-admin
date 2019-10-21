<template lang="pug">
  .page-media-hash
    Breadcrumbs(:crumbs="crumbs")
    BCardGroup(deck)
      BCard(header="Information")
        BForm(@submit.prevent="save")
          BFormGroup(label="Hash" label-for="hash" label-cols="3")
            BFormInput(id="hash" v-model="media.hash" plaintext)
          BFormGroup(label="Filename" label-for="filename" label-cols="3")
            BFormInput(id="filename" v-model="media.filename")
          BFormGroup(label="Extension" label-for="extension" label-cols="3")
            BFormInput(id="extension" v-model="media.extension" plaintext)
          BFormGroup(label="Alternate Text" label-for="altText" label-cols="3")
            BFormInput(id="altText" v-model="media.altText")
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")
      BCard(header="Preview" header-tag="h6" style="overflow:hidden")
        img(:src="media.url" style="max-width:30rem;max-height:30rem;margin:0 auto")
      BCard(header="Stats" header-tag="h6")
        BForm
          BFormGroup(label="Original Size (bytes)" label-for="originalSize" label-cols="4")
            BFormInput(id="originalSize" v-model="media.originalSize" plaintext)
          BFormGroup(label="Optimised Size (bytes)" label-for="optimisedSize" label-cols="4")
            BFormInput(id="optimisedSize" v-model="media.optimisedSize" plaintext)
          BFormGroup(label="Saved (bytes)" label-for="bytesSaved" label-cols="4")
            BFormInput(id="bytesSaved" v-model="media.bytesSaved" plaintext)
          BFormGroup(label="Size Reduction (%)" label-for="percentageDifference" label-cols="4")
            BFormInput(id="percentageDifference" v-model="percentageDifference" plaintext)
</template>

<script>
import update from '@/mixins/crud/update'

export default {
  name: 'PageMediaHash',

  mixins: [update('media', 'hash', 'fullFilename', false)],

  computed: {
    percentageDifference() {
      return `-${((this.media.bytesSaved / this.media.originalSize) * 100).toFixed()}%`
    },
  },
}
</script>
