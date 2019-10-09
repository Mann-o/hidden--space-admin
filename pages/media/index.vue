<template lang="pug">
  .page-media-index

    Breadcrumbs(:crumbs="crumbs")

    .page-media-index__buttons
      BButton.mr-2(to="/media/upload" variant="success") Upload Media
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
      :items="media"
      primary-key="hash"
      responsive="sm"
      :per-page="10"
      :current-page="currentPage"
      empty-text="No media found!"
      show-empty
      striped
      hover
    )
      template(slot="table-busy")
        .text-center.text-info.my-2
          BSpinner.align-middle
          strong.ml-2 Fetching media...
      template(slot="cell(preview)" slot-scope="row")
        BLink(:to="`/media/${row.item.hash}`")
          BImgLazy(:src="row.item.url" width="50" :alt="row.item.altText" thumbnail)
      template(slot="cell(created)" slot-scope="row")
        span {{ row.item.created | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(lastUpdated)" slot-scope="row")
        span {{ row.item.lastUpdated | dateFormat('dd/MM/yyyy - HH:mm') }}
      template(slot="cell(actions)" slot-scope="row")
        BButton.mr-2(size="sm" :to="`/media/${row.item.hash}`" variant="primary") View
        BButton(size="sm" @click="destroy(row.item)" variant="danger") Delete

    BPagination(
      v-if="media.length > 10"
      v-model="currentPage"
      :total-rows="media.length"
      :per-page="10"
      aria-controls="media-table"
    )
</template>

<script>
import index from '@/mixins/crud/index'

export default {
  name: 'PageMediaIndex',

  mixins: [index('media')],

  data: () => ({
    fields: [
      { key: 'preview', sortable: true },
      { key: 'filename', sortable: true },
      { key: 'extension', sortable: true },
      { key: 'hash', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
  }),
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.page-media-index

  +has(buttons)
    padding-bottom: 1rem
</style>
