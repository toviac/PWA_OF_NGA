import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import icons from './modules/icons';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    strict: true,
    icons,
  },
});
