<template lang="pug">
  .page-posts-index
    Breadcrumbs(:crumbs="crumbs")

    .page-posts-index__buttons.pb-3
      BButton(@click="getPosts()" variant="primary") Refresh

    BTable(
      id="posts-table"
      :busy.sync="!posts.length"
      :fields="fields"
      :items="posts"
      primary-key="slug"
      responsive="sm"
      :per-page="10"
      :current-page="currentPage"
      striped
      hover
      small
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching posts...
      template(slot="cell(actions)" slot-scope="row")
        BButton(size="sm" :to="`/posts/${row.item.slug}`" variant="primary") View
    BPagination(
      v-if="posts.length > 10"
      v-model="currentPage"
      :total-rows="posts.length"
      :per-page="10"
      aria-controls="posts-table"
    )
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
    currentPage: 1,
  }),

  async asyncData ({ app: { $axios } }) {
    const { data: posts } = await $axios.get('/api/posts')
    return { posts }
  },

  methods: {
    async getPosts () {
      this.posts = []
      const { data: posts } = await this.$axios.get('/api/posts')
      this.posts = posts
    },
  },
}
</script>
