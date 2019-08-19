<template lang="pug">
  .page-spaces-index
    Breadcrumbs(:crumbs="crumbs")
    BTable(
      v-if="spaces.length"
      :fields="fields"
      :items="spaces"
      primary-key="slug"
      responsive="sm"
      striped
      hover
    )
      template(slot="[actions]" slot-scope="row")
        BButton(size="sm" :to="`/spaces/${row.item.slug}`") View
</template>

<script>
export default {
  name: 'PageSpacesIndex',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Spaces', active: true }],
    fields: [
      { key: 'slug', sortable: true },
      { key: 'propertyNumber', sortable: true },
      { key: 'buildingName', sortable: true },
      { key: 'streetAddress', sortable: true },
      { key: 'city', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    spaces: [],
  }),

  async asyncData({ app: { $axios } }) {
    const { data: spaces } = await $axios.get(
      'http://localhost:3333/api/v1/spaces'
    )
    return { spaces }
  },
}
</script>
