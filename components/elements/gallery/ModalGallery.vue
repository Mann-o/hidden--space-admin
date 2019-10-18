<template lang="pug">
  BModal.modal-gallery(
    id="browse-images-modal"
    :title="title"
    size="xl"
    @shown="loadMedia"
    @ok="$emit('ok', media)"
    hide-header-close
    no-close-on-backdrop
    scrollable
  )
    template(v-if="!loadingMedia")
      Gallery(v-if="media.length" :items="media" @toggle="toggle")
      span(v-else) No media found!
    BSpinner(v-else variant="primary")
</template>

<script>
import Gallery from './Gallery'

export default {
  name: 'ModalGallery',

  components: {
    Gallery,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: 'Select Image',
    },
    exclude: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data: () => ({
    media: [],
    loadingMedia: true,
  }),

  methods: {
    async loadMedia () {
      this.loadingMedia = true
      this.media = []
      const { data: media } = await this.$api.media.index()
      this.media = media
        .filter(({ id }) => !this.exclude.some(({ id: eid }) => eid === id))
        .map((file) => ({ ...file, selected: false }))
      this.loadingMedia = false
    },
    toggle (item) {
      this.media.find((image) => image.id === item.file.id).selected = item.value
    },
  },
}
</script>

<style lang="stylus" scoped>
.modal-gallery
  width: 100%
</style>
