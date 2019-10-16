<template lang="pug">
  BButton(
    :type="type"
    @click="$emit('click')"
    :variant="variant"
    :size="size"
    :disabled="disabled"
  )
    span {{ buttonLabel }}
    BSpinner(v-if="loading" small)
</template>

<script>
export default {
  name: 'SpinnerButton',

  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
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

  computed: {
    buttonLabel () {
      return this.loading
        ? this.labelWhenLoading
        : this.label
    },
  },
}
</script>

<style lang="stylus" scoped>
.spinner-border
  margin-left: 8px
</style>
