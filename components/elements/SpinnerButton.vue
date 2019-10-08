<template lang="pug">
  BButton(@click="$emit('click')" :variant="variant" :disabled="disabled")
    span {{ loading ? labelWhenLoading : label }}
    BSpinner(v-if="loading" small)
</template>

<script>
export default {
  name: 'SpinnerButton',

  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: 'Save',
    },
    labelWhenLoading: {
      type: String,
      required: false,
      default: 'Saving',
    },
  },
}
</script>

<style lang="stylus" scoped>
.spinner-border
  margin-left: 8px
</style>
