<template lang="pug">
  .page-media-hash
    Breadcrumbs(:crumbs="crumbs")
    pre(v-if="media != null") {{ media }}
</template>

<script>
export default {
  name: 'PageMediaHash',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    media: null,
  }),

  computed: {
    crumbs() {
      return [
        { text: 'Media', to: '/media' },
        {
          text: this.media == null ? '' : this.media.fullFilename,
          active: true,
        },
      ]
    },
  },

  async asyncData({ app: { $axios }, params }) {
    const { data: media } = await $axios.get(
      `http://localhost:3333/api/v1/media/${params.hash}`
    )
    return { media }
  },
}
</script>
