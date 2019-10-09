<template lang="pug">
  BModal(
    id="browse-images-modal"
    :title="title"
    size="lg"
    @shown="loadMedia"
    hide-header-close
    no-close-on-backdrop
    ok-only
    scrollable
  )
    .modal-gallery
      .modal-gallery__items(v-if="!loadingMedia && media.length")
        BCard(
          v-if="media.length"
          v-for="file in media"
          :key="file.hash"
          no-body
        )
          .modal-gallery__item(
            :style="mediaStyle(file.url)"
            :class="mediaClass(file.id)"
            @click="$emit('select', file)"
          )
      span(v-else) No media found!

      BSpinner(v-else variant="primary")
</template>

<script>
export default {
  name: 'ModalGallery',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Select Image',
    },
    selected: {
      required: true,
      validator: (i) => (Number.isInteger(i) || (i == null)),
    },
  },

  data: () => ({
    media: [],
    loadingMedia: false,
  }),

  methods: {
    async loadMedia () {
      this.loadingMedia = true
      this.media = []
      const { data: media } = await this.$axios.get('/api/media')
      this.media = media
      this.loadingMedia = false
    },
    mediaStyle (url) {
      return { backgroundImage: `url(${url})` }
    },
    mediaClass (id) {
      return { 'modal-gallery__item--selected': this.isSelected(id) }
    },
    isSelected (id) {
      return (id === this.selected)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.modal-gallery
  width: 100%
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 2rem

  +has(item)
    cursor: pointer
    height: 12rem
    background-size: cover
    background-position: center
    border: 1px solid #ced4da
    box-shadow: 0 0 0 0.5rem #fff
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, filter 0.2s ease-in-out
    filter: grayscale(0.75)

    +is(selected)
      border-color: #80bdff
      outline: 0;
      box-shadow: 0 0 0 0.5rem rgba(0, 123, 255, 0.25)
      filter: none
</style>
