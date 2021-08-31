import Vue from 'vue'
import Vuex from 'vuex'
import loginModul from './modules/loginModul'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userName:''
  },
  mutations: {
    // setUserName(state,payload){
    //   state.userName=payload
    // },
    // del(state){
    //   state.userName=''
    // }

  },
  actions: {
  },
  modules: {
    loginModul,
  }
})
