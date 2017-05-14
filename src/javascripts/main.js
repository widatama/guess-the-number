import Vue from 'vue';
import './vueConfig';

import AppComponent from './components/app.vue';

global.App = new Vue({
  el: '#vue_app',
  render: h => h(AppComponent),
});
