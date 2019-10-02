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
      template(slot="cell(preview)" slot-scope="row")
        BLink(:to="`/media/${row.item.hash}`")
          BImgLazy(:src="row.item.url" width="50" :alt="row.item.altText" thumbnail)
      template(slot="cell(actions)" slot-scope="row")
        BButton(size="sm" :to="`/media/${row.item.hash}`") View
        BButton(size="sm" @click="deleteMedia(row.item)" variant="danger") Delete
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

  async asyncData ({ app: { $axios } }) {
    const { data: media } = await $axios.get('/api/media')
    return { media }
  },

  methods: {
    async getMedia () {
      this.media = []
      const { data: media } = await this.$axios.get('/api/media')
      this.media = media
    },
    async deleteMedia (media) {
      const doDelete = await this.$bvModal.msgBoxConfirm(
        `Are you sure you wish to delete this media? This operation is irreversible!`,
        {
          title: 'Delete Media?',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideHeaderClose: true,
          centered: true,
        }
      )
      if (doDelete) {
        const {
          data: { status },
        } = await this.$axios.delete(`/api/media/${media.hash}`)
        if (status === 'success') {
          this.getMedia()
          this.$bvToast.toast('Media deleted successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        }
      }
    },
  },
}
</script>
