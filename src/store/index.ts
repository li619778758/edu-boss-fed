import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  getters: {
  },
  mutations: {
    setUser (state, playLoad) {
      window.localStorage.setItem('user', playLoad)
      state.user = JSON.parse(playLoad)
    }
  },
  actions: {
  },
  modules: {
  }
})
