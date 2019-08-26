<template lang="pug">
  .page-index
    Breadcrumbs
    ModelCounters(:counters="counters")
</template>

<script>
export default {
  name: 'PageIndex',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    ModelCounters: () => import('@/components/page/index/ModelCounters'),
  },

  data: () => ({
    spaceCount: 0,
    therapistCount: 0,
    postCount: 0,
    userCount: 0,
    mediaCount: 0,
  }),

  computed: {
    counters () {
      return [
        { to: '/spaces', label: 'Spaces', count: this.spaceCount },
        { to: '/therapists', label: 'Therapists', count: this.therapistCount },
        { to: '/posts', label: 'Posts', count: this.postCount },
        { to: '/users', label: 'Users', count: this.userCount },
        { to: '/media', label: 'Media', count: this.mediaCount },
      ]
    },
  },

  async asyncData ({ app: { $axios } }) {
    const { data: { spaceCount, therapistCount, postCount, userCount, mediaCount } } = await $axios.get('/api/')
    return {
      spaceCount,
      therapistCount,
      postCount,
      userCount,
      mediaCount,
    }
  },
}
</script>
