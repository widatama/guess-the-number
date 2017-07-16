import VueRouter from 'vue-router';

import Intro from '../components/route/intro.vue';
import GameBoard from '../components/route/game_board.vue';
import Guide from '../components/route/guide.vue';

const routes = [
  { path: '/', component: Intro },
  { path: '/game', component: GameBoard },
  { path: '/guide', component: Guide },
];

const router = new VueRouter({
  routes,
});

export default router;
