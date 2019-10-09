export default (model) => ({
  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
  },

  data: () => ({
    crumbs: [
      {
        text: model.charAt(0).toUpperCase() + model.slice(1),
        active: true,
      },
    ],
    [model]: [],
    indexing: false,
    currentPage: 1,
  }),

  computed: {
    shouldChangeToPreviousPage () {
      return (
        (this[model].length % 10 === 0) &&
        (this.currentPage > Math.ceil(this[model].length / 10))
      )
    },
  },

  async asyncData ({ app: { $axios } }) {
    const { data } = await $axios.get(`/api/${model}`)
    return { [model]: data }
  },

  methods: {
    async index () {
      this.indexing = true
      this[model] = []
      const { data } = await this.$axios.get(`/api/${model}`)
      this[model] = data
      if (this.shouldChangeToPreviousPage) {
        this.currentPage = this.currentPage - 1
      }
      this.indexing = false
    },
    confirmDelete () {
      return this.$bvModal.msgBoxConfirm('Are you sure you wish to delete this item? This operation is irreversible!', {
        title: 'Delete Item?',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Delete',
        hideHeaderClose: true,
        centered: true,
      })
    },
    async destroy (item) {
      if (await this.confirmDelete()) {
        const { data: { status } } = await this.$axios.delete(`/api/${model}/${item.id}`)
        if (status === 'success') {
          this.index()
          this.$bvToast.toast('Deleted successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        }
      }
    },
  },
})