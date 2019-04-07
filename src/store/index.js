import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import current from './modules/current';
import icons from './modules/icons';
// import emotions from './modules/emotions';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  getters,
  modules: {
    icons,
    current,
    // emotions,
  },
});
