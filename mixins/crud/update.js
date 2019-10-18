import { omit } from 'lodash'

export default (model, identifier, label) => ({
  transition: 'fade',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
    Gallery: () => import('@/components/elements/gallery/Gallery'),
    ModalGallery: () => import('@/components/elements/gallery/ModalGallery'),
    SpinnerButton: () => import('@/components/elements/SpinnerButton'),
  },

  data: () => ({
    [model]: null,
    images: [],
    isSaving: false,
  }),

  computed: {
    crumbs () {
      return [
        { text: model.charAt(0).toUpperCase() + model.slice(1), to: `/${model}s` },
        {
          text: this[model] == null ? '' : this[model][label],
          active: true,
        },
      ]
    },
    hasImagesSelected () {
      return this.images.some(({ selected }) => selected)
    },
    selectedImagesCount () {
      return this.images.filter(({ selected }) => selected).length
    },
  },

  async asyncData ({ app: { $api }, params }) {
    const { data } = await $api[`${model}s`].show(params[identifier])
    const images = data.images.map((image) => ({ ...image, selected: false }))
    return { [model]: omit(data, ['images']), images }
  },

  methods: {
    async save () {
      this.isSaving = true
      try {
        const { data } = await this.$api[`${model}s`].update(this[model].id, this[model])
        if (data.status === 'success') {
          this[model] = data[model]
          this.$bvToast.toast('Update successfully!', {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
          })
        } else {
          throw new Error('error')
        }
      } catch (error) {
        this.$bvToast.toast('Updated failed - please try again.', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
        })
      } finally {
        this.isSaving = false
      }
    },
    toggle (item) {
      this.images.find((image) => image.id === item.file.id).selected = item.value
    },
    addSelectedImages (media) {
      const newMedia = media
        .filter(({ selected }) => selected)
        .map((file) => ({ ...file, selected: false }))

      this.images = [
        ...this.images,
        ...newMedia,
      ]

      this.$api[`${model}s`].addImages(this[model].id, {
        image_ids: newMedia.map(({ id }) => id),
      })
    },
    removeSelectedImages () {
      this.$api[`${model}s`].removeImages(this[model].id, {
        image_ids: this.images
          .filter(({ selected }) => selected)
          .map(({ id }) => id),
      })
      this.images = this.images.filter(({ selected }) => !selected)
    },
  },
})
