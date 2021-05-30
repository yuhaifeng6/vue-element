import Cookie from 'js-cookie'

export default {
  state: {
    token: '',
    userinfo: Cookie.get('userinfo') || ''
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {
      state.token = Cookie.get('token')
    },
    setUserInfo (state, info) {
      let infojson = JSON.stringify(info)
      state.userinfo = infojson
      Cookie.set('userinfo', infojson)
    },
    clearUserInfo (state) {
      state.userinfo = ''
      Cookie.remove('userinfo')
    }
  },
  actions: {}
}
