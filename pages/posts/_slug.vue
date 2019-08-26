<template lang="pug">
  .page-posts-slug
    Breadcrumbs(:crumbs="crumbs")
    pre(v-if="post != null") {{ post }}
</template>

<script>
export default {
  name: 'PagePostsSlug',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    post: null,
  }),

  computed: {
    crumbs () {
      return [{ text: 'Posts', to: '/posts' }, { text: this.post == null ? '' : this.post.title, active: true }]
    },
  },

  async asyncData ({ app: { $axios }, params }) {
    const { data: post } = await $axios.get(`/api/posts/${params.slug}`)
    return { post }
  },
}
</script>
