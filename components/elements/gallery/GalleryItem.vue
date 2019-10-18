<template lang="pug">
  .gallery-item(:class="mediaClass" @click="toggle(!file.selected)")
    img(:src="file.url")
    BFormCheckbox.gallery-item__checkbox(:checked="file.selected" disabled)
</template>

<script>
export default {
  name: 'GalleryItem',

  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    mediaClass () {
      return { 'gallery-item--selected': this.file.selected }
    },
  },

  methods: {
    toggle (value) {
      this.$emit('toggle', { file: this.file, value })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.gallery-item
  cursor: pointer
  border: 1px solid #ced4da
  box-shadow: 0 0 0 0.5rem #fff
  position: relative
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, filter 0.2s ease-in-out

  img
    max-width: 100%

  +has(checkbox)
    position: absolute
    top: 5px
    right: 5px
    opacity: 0
    transition: opacity 0.2s
    pointer-events: none

  +is(selected)
    border-color: #80bdff
    outline: 0;
    box-shadow: 0 0 0 0.5rem rgba(0, 123, 255, 0.25)
    filter: none

    .gallery-item__checkbox
      opacity: 1

  &:hover .gallery-item__checkbox
    opacity: 1
</style>
