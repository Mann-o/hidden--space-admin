<template lang="pug">
  .page-therapists-slug
    Breadcrumbs(:crumbs="crumbs")
    pre(v-if="therapist != null") {{ therapist }}
</template>

<script>
export default {
  name: 'PageTherapistsSlug',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    therapist: null,
  }),

  computed: {
    crumbs() {
      return [
        { text: 'Therapists', to: '/therapists' },
        {
          text: this.therapist == null ? '' : this.therapist.fullNameWithTitle,
          active: true,
        },
      ]
    },
  },

  async asyncData({ app: { $axios }, params }) {
    const { data: therapist } = await $axios.get(
      `http://localhost:3333/api/v1/therapists/${params.slug}`
    )
    return { therapist }
  },
}
</script>
