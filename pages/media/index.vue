<template lang="pug">
  .page-media-index

    Breadcrumbs(:crumbs="crumbs")

    .page-media-index__buttons
      BButton.mr-2(to="/media/upload" variant="success") Upload Media
      SpinnerButton(
        @click="getMedia()"
        :disabled="loadingMedia"
        :loading="loadingMedia"
        label="Refresh"
        label-when-loading="Refreshing"
      )

    BTable(
      id="posts-table"
      :busy.sync="loadingMedia"
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
        BButton(size="sm" @click="deleteMedia(row.item)" variant="danger") Delete

    BPagination(
      v-if="media.length > 10"
      v-model="currentPage"
      :total-rows="media.length"
      :per-page="10"
      aria-controls="media-table"
    )
</template>

<script>
export default {
  name: 'PageUsersIndex',

  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
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
    loadingMedia: false,
    currentPage: 1,
  }),

  computed: {
    shouldChangePage () {
      return (
        (this.media.length % 10 === 0) &&
        (this.currentPage > Math.ceil(this.media.length / 10))
      )
    },
  },

  async asyncData ({ app: { $axios } }) {
    const { data: media } = await $axios.get('/api/media')
    return { media }
  },

  methods: {
    async getMedia () {
      this.loadingMedia = true
      this.media = []
      const { data: media } = await this.$axios.get('/api/media')
      this.media = media
      if (this.shouldChangePage) {
        this.currentPage = this.currentPage - 1
      }
      this.loadingMedia = false
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

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.page-media-index

  +has(buttons)
    padding-bottom: 1rem
</style>
