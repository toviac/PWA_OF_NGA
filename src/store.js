import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// https://www.cnblogs.com/yuzhongyu/p/10451947.html
// 检索icon目录
const context = require.context('../public/img/icons', false, /.png$/);
const moduleStores = {};
context.keys().forEach(key => {
  const fileName = key.slice(2, -3);
  const fileModule = context(key).default;
  moduleStores[fileName] = {
    ...fileModule,
    namespaced: true,
  };
});

export default new Vuex.Store({
  modules: {
    ...moduleStores,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
