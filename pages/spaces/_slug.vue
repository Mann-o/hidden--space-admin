<template lang="pug">
  .page-spaces-slug
    Breadcrumbs(:crumbs="crumbs")
    pre(v-if="space != null") {{ space }}
</template>

<script>
export default {
  name: 'PageSpacesSlug',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    space: null,
  }),

  computed: {
    crumbs() {
      return [
        { text: 'Spaces', to: '/spaces' },
        {
          text: this.space == null ? '' : this.space.address,
          active: true,
        },
      ]
    },
  },

  async asyncData({ app: { $axios }, params }) {
    const { data: space } = await $axios.get(
      `http://localhost:3333/api/v1/spaces/${params.slug}`
    )
    return { space }
  },
}
</script>
