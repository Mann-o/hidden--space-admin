<template lang="pug">
  .layout-default
    ConnectivityMonitor
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
    ConnectivityMonitor: () => import('@/components/utilities/ConnectivityMonitor'),
  },
}
</script>

<style lang="stylus">
@import '~assets/styles/core/helpers/required-fields'
@import '~assets/styles/core/helpers/bootstrap-overrides'
@import '~assets/styles/core/animation/fade'
@import '~assets/styles/vendor/quill'
</style>
