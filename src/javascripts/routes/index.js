import VueRouter from 'vue-router';

import GameBoard from '../components/pages/game_board.vue';
import Guide from '../components/pages/guide.vue';

const router = new VueRouter({
  routes: [
    { path: '/', component: GameBoard },
    { path: '/guide', component: Guide },
  ],
});

export default router;
