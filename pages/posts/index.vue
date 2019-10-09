<template lang="pug">
  .page-posts-index
    Breadcrumbs(:crumbs="crumbs")

    .page-posts-index__buttons.pb-3
      BButton.mr-2(v-b-modal.new-post-modal variant="success") Create New Post
      SpinnerButton(
        @click="index()"
        :disabled="indexing"
        :loading="indexing"
        label="Refresh"
        label-when-loading="Refreshing"
      )

    BTable(
      id="posts-table"
      :busy.sync="indexing"
      :fields="fields"
      :items="posts"
      primary-key="slug"
      responsive="sm"
      :per-page="10"
      :current-page="currentPage"
      empty-text="No posts found!"
      show-empty
      striped
      hover
      small
      bordered
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching posts...
      template(slot="cell(slug)" slot-scope="row")
        nuxt-link(:to="`/posts/${row.item.slug}`") {{ row.item.slug }}
      template(slot="cell(author)" slot-scope="row")
        span {{ row.item.author.username }}
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton.mr-2(size="sm" :to="`/posts/${row.item.slug}`" variant="primary") View
        BButton(size="sm" variant="danger" @click="destroy(row.item)") Delete
    BPagination(
      v-if="posts.length > 10"
      v-model="currentPage"
      :total-rows="posts.length"
      :per-page="10"
      aria-controls="posts-table"
    )
</template>

<script>
import index from '@/mixins/crud/index'

export default {
  name: 'PagePostsIndex',

  mixins: [index('posts')],

  data: () => ({
    fields: [
      { key: 'slug', sortable: true },
      { key: 'title', sortable: true },
      { key: 'author', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
  }),
}
</script>
