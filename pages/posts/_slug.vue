<template lang="pug">
  .page-posts-slug
    Breadcrumbs(:crumbs="crumbs")

    BCardGroup(deck)
      BCard(header="Information" header-tag="h6")
        BForm(@submit.prevent="save")
          BFormGroup(label="Slug" label-for="slug" label-cols="3")
            BFormInput(id="slug" v-model="post.slug")
          BFormGroup(label="Author" label-for="author" label-cols="3")
            BFormSelect(id="author" :options="postAuthors" v-model="post.authorId")
          BFormGroup(label="Title" label-for="title" label-cols="3")
            BFormInput(id="title" v-model="post.title")
          BFormGroup(label="Content" label-for="content" label-cols="3")
            quill(id="content" v-model="post.content" output="html" :config="quillConfig")
          BFormGroup(label-cols="3")
            SpinnerButton(type="submit" :disabled="isSaving" :loading="isSaving" label="Save Changes")

      BCard(header="Media" header-tag="h6")
        BButton.mr-2(v-b-modal.browse-images-modal variant="success") Add Images
        BButton(variant="danger" v-if="hasImagesSelected" @click="removeSelectedImages") Remove ({{ selectedImagesCount }})
        Gallery(v-if="images.length" :items="images" @toggle="toggle" padded)
        BAlert.gallery__empty(v-else variant="warning" show) No images have been added yet!

    ModalGallery(
      title="Select Images"
      :exclude="images"
      @ok="addSelectedImages"
    )
</template>

<script>
import update from '@/mixins/crud/update'

export default {
  name: 'PagePostsSlug',

  mixins: [update('post', 'slug', 'id', 'title')],

  data: () => ({
    authors: [],
    quillConfig: {
      placeholder: 'Enter some text for this Post',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
      theme: 'bubble',
    },
  }),

  computed: {
    postAuthors () {
      return this.authors == null ? [] : this.authors.map(({ id, username }) => ({
        value: id,
        text: username,
      }))
    },
  },

  async mounted () {
    const { data: authors } = await this.$api.users.index()
    this.authors = authors
  },
}
</script>

<style lang="stylus">
@import '~assets/styles/core/mixins/bem'

.gallery
  .alert
    margin-bottom: 0

  +has(empty)
    margin-top: 1.4rem
</style>
