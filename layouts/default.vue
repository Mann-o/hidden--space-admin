<template lang="pug">
  .layout-default
    MainNavigation

    BContainer(fluid)
      BRow
        BCol
          nuxt
</template>

<script>
export default {
  name: 'LayoutDefault',

  components: {
    MainNavigation: () => import('@/components/layout/MainNavigation'),
  },
}
</script>

<style lang="stylus">
@import '~assets/styles/core/helpers/required-fields'
@import '~assets/styles/core/animation/fade'
@import '~assets/styles/vendor/quill'
</style>
