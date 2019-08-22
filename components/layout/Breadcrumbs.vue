<template lang="pug">
  .breadcrumbs
    BBreadcrumb(:items="crumbsWithHome")
</template>

<script>
export default {
  name: 'Breadcrumbs',

  props: {
    crumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    crumbsWithHome () {
      return [
        {
          text: 'Home',
          ...(this.crumbs == null ? { active: true } : { to: '/' }),
        },
        ...this.crumbs,
      ]
    },
  },
}
</script>

<style lang="stylus">
.breadcrumbs
  padding-top: 1rem
</style>
