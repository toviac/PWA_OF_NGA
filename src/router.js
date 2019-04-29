/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/test',
      component: () => import('@/test/ScrollerTest.vue'),
      meta: {
        title: '测试',
      },
    },
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true,
      },
      children: [
        {
          path: '',
          component: () => import('@/views/categories/Categories.vue'),
          meta: {
            title: '论坛',
            keepAlive: true,
          },
          children: [
            {
              path: '/blocks/:fid',
              component: () => import('@/views/post-list/List.vue'),
              meta: {},
              children: [
                {
                  path: '/post/:tid',
                  component: () => import('@/views/post/Post.vue'),
                  meta: {},
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

// 路由栈
const routerStack = [];
router.beforeEach((to, from, next) => {
  if (routerStack.length && routerStack.findIndex(r => r.path === to.path)) {
    // 后退
    routerStack.length--;
    from.meta.keepAlive = false;
  } else {
    // 前进
    to.meta.keepAlive = true;
  }
  next();
});

export default router;
