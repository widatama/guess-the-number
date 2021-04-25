import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import GameBoard from '@/views/GameBoard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'GameBoard',
    component: GameBoard,
  },
  {
    path: '/guide',
    name: 'Guide',
    // route level code-splitting
    // this generates a separate chunk (guide.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "guide" */ '@/views/GameGuide.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
