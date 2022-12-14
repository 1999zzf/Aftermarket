import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isopen:'',//侧边栏是否展开
    isshowaside:true,
    isChangeAsideList:false,
  },
  mutations: {
    change_isopen(state,s_width){
      state.isopen = s_width.isopen
    },
    change_isshowaside(state,typeN){
      state.isshowaside = typeN.isshowaside
    },
    actionAside(state,typeN){
      state.isChangeAsideList = typeN.isChangeAsideList
    }
  },
  actions: {

  },
  modules: {
  }
})
