<template lang="pug">
  .page-users-index
    Breadcrumbs(:crumbs="crumbs")

    BRow
      BCol
        BButton(variant="primary" to="/media/upload") Upload Media

    BTable(
      v-if="media.length"
      :fields="fields"
      :items="media"
      primary-key="hash"
      responsive="sm"
      striped
      hover
    )
      template(slot="[preview]" slot-scope="row")
        BLink(:to="`/media/${row.item.hash}`")
          BImgLazy(:src="row.item.url" width="50" :alt="row.item.altText" thumbnail)
      template(slot="[actions]" slot-scope="row")
        BButton(size="sm" :to="`/media/${row.item.hash}`") View
</template>

<script>
export default {
  name: 'PageUsersIndex',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Media', active: true }],
    fields: [
      { key: 'preview', sortable: true },
      { key: 'filename', sortable: true },
      { key: 'extension', sortable: true },
      { key: 'hash', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    media: [],
  }),

  async asyncData({ app: { $axios } }) {
    const { data: media } = await $axios.get(
      'http://localhost:3333/api/v1/media'
    )
    return { media }
  },
}
</script>
