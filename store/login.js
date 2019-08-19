export const state = () => ({
  credentials: {
    loginId: null,
    password: null,
  },
  isLoggingIn: false,
})

export const actions = {
  updateLoginId({ commit }, newLoginId) {
    commit('UPDATE_LOGIN_ID', newLoginId)
  },
  updatePassword({ commit }, newPassword) {
    commit('UPDATE_PASSWORD', newPassword)
  },
  startLoading({ commit }) {
    commit('START_LOGGING_IN')
  },
  stopLoading({ commit }) {
    commit('STOP_LOGGING_IN')
  },
}

export const mutations = {
  START_LOGGING_IN(state) {
    state.isLoggingIn = true
  },
  STOP_LOGGING_IN(state) {
    state.isLoggingIn = false
  },
  UPDATE_LOGIN_ID(state, loginId) {
    state.credentials.loginId = loginId
  },
  UPDATE_PASSWORD(state, newPassword) {
    state.credentials.password = newPassword
  },
}
