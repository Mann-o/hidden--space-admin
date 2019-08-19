<template lang="pug">
  BListGroup(horizontal)
    ModelCounterItem(
      v-for="({ to, label, count }, index) in counters"
      :key="index"
      :to="to"
      :label="label" :count="count"
    )
</template>

<script>
export default {
  name: 'ModelCounters',

  components: {
    ModelCounterItem: () => import('./ModelCounterItem'),
  },

  props: {
    counters: {
      type: Array,
      required: true,
    },
  },
}
</script>
