import Vue from 'vue';
import './cube-ui';
import './muse-ui';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import http from './common/http';
import urls from './common/urls';
import TransitionRouterView from './components/TransitionRouterView.vue';


moment.locale('zh-cn');
// 全局时间filter
Vue.filter('formatDate', (timestamp, pattern) => {
  if (pattern) {
    return moment(timestamp * 1000).format(pattern);
  }
  const duration = moment.duration(moment(timestamp * 1000) - moment());
  switch (true) {
    case duration.years() < -1:
      return moment(timestamp * 1000).format('YYYY-MM-DD HH:mm');
    case duration.days() < -1:
      return moment(timestamp * 1000).format('MM-DD HH:ss');
    case duration.hours() < -1:
      return moment(timestamp * 1000).format('今天 HH:ss');
    case duration.minutes() > -1:
      return '刚刚';
    default:
      break;
  }
  return duration.humanize(true).replace(/ /g, '');
});

Vue.config.productionTip = false;

// 全局注册axios方法$http
Vue.prototype.$http = http;

// 全局注册url列表
Vue.prototype.$urls = urls;

// 全局注册动画router-view
Vue.component('transition-router-view', TransitionRouterView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
