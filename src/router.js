import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/views/categories/Categories.vue'),
          meta: {
            title: '论坛',
            keepAlive: true,
          },
        },
      ],
    },
    {
      path: '/blocks/:id',
      component: () => import('@/views/post-list/List.vue'),
      meta: {},
    },
  ],
});
