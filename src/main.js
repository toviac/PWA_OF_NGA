import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import http from './common/http';
import urls from './common/urls';

Vue.config.productionTip = false;

// 全局注册axios方法$http
Vue.prototype.$http = http;

// 全局注册url列表
Vue.prototype.$urls = urls;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
