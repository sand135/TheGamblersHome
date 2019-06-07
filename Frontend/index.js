import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  authenticated: false
}
const store = new Vuex.Store({
  state
})


new Vue({
  el: '#app',
  router:Router,
  store: store,
  render: h => h(App)
})
