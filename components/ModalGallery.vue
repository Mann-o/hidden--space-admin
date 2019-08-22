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
      BCard(
        v-if="showGallery"
        v-for="m in media"
        :key="m.hash"
        no-body
      )
        .modal-gallery__item(
          :style="mediaStyle(m.url)"
          :class="mediaClass(m.id)"
          @click="$emit('select', m)"
        )

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
    media: null,
  }),

  computed: {
    showGallery () {
      return ((this.media != null) && this.media.length)
    },
  },

  methods: {
    async loadMedia () {
      this.media = []
      const { data: media } = await this.$axios.get('http://localhost:3333/api/v1/media')
      this.media = media
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
