<template lang="pug">
  .gallery(:class="{ 'gallery--padded': padded }")
    .gallery__items(v-if="items.length")
      GalleryItem(v-for="file in items" :key="file.hash" :file="file" @toggle="toggle")
    span(v-else) No media found!
</template>

<script>
export default {
  name: 'Gallery',

  components: {
    GalleryItem: () => import('./GalleryItem'),
  },

  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    padded: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    toggle (file) {
      this.$emit('toggle', file)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.gallery

  +is(padded)
    padding-top: 2rem

  +has(items)
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-gap: 2rem
</style>
