<template lang="pug">
  BListGroupItem(:to="to").d-flex.justify-content-between.align-items-center
    span {{ label }}
    BBadge(variant="primary" pill) {{ count }}
</template>

<script>
export default {
  name: 'ModelCounterItem',

  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    count: {
      type: [Number, String],
      required: true,
    },
  },
}
</script>
