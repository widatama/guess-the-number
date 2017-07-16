import Vue from 'vue';
import './vueConfig';

import Game from './modules/numberEngine';

import AppComponent from './components/app.vue';
import router from './routes/index';
import store from './store/index';

global.App = new Vue({
  el: '#vue_app',
  router,
  store,
  render: h => h(AppComponent),
});

global.Game = Game;
