<template lang="pug">
  .page-therapists-index
    Breadcrumbs(:crumbs="crumbs")
    BTable(
      v-if="therapists.length"
      :fields="fields"
      :items="therapists"
      primary-key="slug"
      responsive="sm"
      striped
      hover
    )
      template(slot="[gender]" slot-scope="row")
        span {{ row.item.gender.charAt(0).toUpperCase() + row.item.gender.slice(1) }}
      template(slot="[actions]" slot-scope="row")
        BButton(size="sm" :to="`/therapists/${row.item.slug}`") View
</template>

<script>
export default {
  name: 'PageTherapistsIndex',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    crumbs: [{ text: 'Therapists', active: true }],
    fields: [
      { key: 'slug', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'title', sortable: true },
      { key: 'firstNames', sortable: true },
      { key: 'lastNames', sortable: true },
      { key: 'created', sortable: true },
      { key: 'emailAddress', sortable: true },
      { key: 'telephoneNumber', sortable: true },
      { key: 'created', sortable: true },
      { key: 'lastUpdated', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    therapists: [],
  }),

  async asyncData({ app: { $axios } }) {
    const { data: therapists } = await $axios.get(
      'http://localhost:3333/api/v1/therapists'
    )
    return { therapists }
  },
}
</script>
