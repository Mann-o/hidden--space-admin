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
