<template lang="pug">
  .connectivity-monitor(:class="{ 'connectivity-monitor--active': !isOnline }")
    BAlert(variant="danger" show) You appear to have no internet connection!
</template>

<script>
import { mapState, mapActions } from 'vuex'

const EVENTS = [
  'online',
  'offline',
  'load',
]

export default {
  name: 'ConnectivityMonitor',

  computed: {
    ...mapState('connectivity', [
      'isOnline',
    ]),
  },

  mounted () {
    if (process.client) {
      EVENTS.forEach((event) => {
        window.addEventListener(event, this.updateOnlineStatus)
      })
    }
  },

  beforeDestroy () {
    if (process.client) {
      EVENTS.forEach((event) => {
        window.removeEventListener(event, this.updateOnlineStatus)
      })
    }
  },

  methods: {
    ...mapActions('connectivity', [
      'setOnline',
      'setOffline',
    ]),
    updateOnlineStatus () {
      this.online = navigator.onLine || false
      this[`setO${this.online ? 'n' : 'ff'}line`]()
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/core/mixins/bem'

.connectivity-monitor
  position: absolute
  bottom: 1rem
  right: 1rem
  opacity: 0
  transition: opacity 0.2s
  z-index: 9999

  +is(active)
    opacity 0.8

    &:hover
      opacity 1
</style>
