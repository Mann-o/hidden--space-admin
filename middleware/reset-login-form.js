export default ({ store }) => {
  store.dispatch('login/updateLoginId', null)
  store.dispatch('login/updatePassword', null)
}
