export const state = () => ({
  isOnline: true,
})

export const actions = {
  setOnline ({ commit }) {
    commit('SET_ONLINE')
  },
  setOffline ({ commit }) {
    commit('SET_OFFLINE')
  },
}

export const mutations = {
  SET_ONLINE (state) {
    state.isOnline = true
  },
  SET_OFFLINE (state) {
    state.isOnline = false
  },
}
