<template lang="pug">
  .page-users-username
    Breadcrumbs(:crumbs="crumbs")
    pre(v-if="user != null") {{ user }}
</template>

<script>
export default {
  name: 'PageUsersSlug',

  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs'),
  },

  data: () => ({
    user: null,
  }),

  computed: {
    crumbs() {
      return [
        { text: 'Users', to: '/users' },
        {
          text: this.user == null ? '' : this.user.username,
          active: true,
        },
      ]
    },
  },

  async asyncData({ app: { $axios }, params }) {
    const { data: user } = await $axios.get(
      `http://localhost:3333/api/v1/users/${params.username}`
    )
    return { user }
  },
}
</script>
