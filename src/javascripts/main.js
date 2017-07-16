import Vue from 'vue';
import './vueConfig';

import Game from './modules/numberEngine';

import AppComponent from './components/app.vue';
import router from './routes/index';

global.App = new Vue({
  el: '#vue_app',
  router,
  render: h => h(AppComponent),
});

global.Game = Game;
