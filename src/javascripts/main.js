import Vue from 'vue';
import './vueConfig';

import App from './components/app.vue';
import router from './routes/index';
import store from './store/index';

global.App = new Vue({
  el: '#vue_app',
  name: 'guess-the-number',
  router,
  store,
  render: h => h(App),
});
