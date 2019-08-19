<template lang="pug">
  .layout-auth(:style="{ backgroundImage }")
    .layout-auth__overlay
      .layout-auth__content
        nuxt
</template>

<script>
export default {
  name: 'LayoutAuth',

  data: () => ({
    backgroundImage: null,
  }),

  mounted() {
    this.chooseRandomBackgroundImage()
  },

  methods: {
    chooseRandomBackgroundImage() {
      const randomNumber = Math.ceil(Math.random() * 10)
      this.backgroundImage = `url(/images/login-wallpapers/wallpaper-${randomNumber}.jpg)`
    },
  },
}
</script>

<style lang="stylus">
.layout-auth
  height: 100vh
  max-height: 100vh
  position: relative
  transition: background-image 0.2s
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  overflow: hidden

.layout-auth__image
  object-fit: cover

.layout-auth__overlay
  position: absolute
  background-color: rgba(255, 255, 255, 0.5)
  top: 0
  left: 0
  right: 0
  bottom: 0

.layout-auth__content
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
</style>
