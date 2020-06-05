import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    login (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logout (state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
    login (context, user) {
      context.commit('login', user)
    },
    logout (context) {
      context.commit('logout')
    }
  },
  modules: {
  }
})
