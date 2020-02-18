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
    deleting: false,
  }),

  computed: {
    shouldChangeToPreviousPage () {
      return (
        (this[model].length % 10 === 0) &&
        (this.currentPage > Math.ceil(this[model].length / 10))
      )
    },
  },

  async asyncData ({ app: { $api } }) {
    const { data } = await $api[model].index()
    return { [model]: data }
  },

  methods: {
    async index () {
      this.indexing = true
      this[model] = []
      const { data } = await this.$api[model].index()
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
        this.deleting = true
        const { data: { status, message } } = await this.$api[model].delete(item.id)
        this.deleting = false
        if (status === 'success') {
          this.index()
        }
        this.$bvToast.toast(
          (status === 'success' ? 'Deleted successfully!' : message),
          {
            title: status.charAt(0).toUpperCase() + status.slice(1),
            autoHideDelay: 5000,
            variant: (status === 'success') ? 'success' : 'danger',
          },
        )
      }
    },
  },
})
