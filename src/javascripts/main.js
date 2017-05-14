import Vue from 'vue';
import './vueConfig';

import Game from './modules/numberEngine';

import AppComponent from './components/app.vue';

global.App = new Vue({
  el: '#vue_app',
  render: h => h(AppComponent),
});

global.Game = Game;
