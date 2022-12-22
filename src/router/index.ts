import { createRouter, createWebHistory } from 'vue-router';
import GameBoard from '@/views/GameBoard.vue';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GameBoard',
      component: GameBoard,
    },
    {
      path: '/guide',
      name: 'Guide',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/GameGuide.vue'),
    },
  ],
});

export default router;
