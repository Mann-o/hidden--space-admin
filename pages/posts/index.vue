<template lang="pug">
  .page-posts-index
    Breadcrumbs(:crumbs="crumbs")
    BTable(
      v-if="posts.length"
      :fields="fields"
      :items="posts"
      primary-key="slug"
      responsive="sm"
      striped
      hover
    )
      template(slot="cell(actions)" slot-scope="row")
        BButton(size="sm" :to="`/posts/${row.item.slug}`") View
</template>

<script>
export default {
  name: 'PagePostsIndex',

  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Posts', active: true }],
    fields: [{ key: 'slug', sortable: true }, { key: 'actions', label: 'Actions' }],
    posts: [],
  }),

  async asyncData ({ app: { $axios } }) {
    const { data: posts } = await $axios.get('/api/posts')
    return { posts }
  },
}
</script>
