import Vue from 'vue';
import '../stylesheets/main.css';

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
  created() {
    this.$store.dispatch('initialize');
  },
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in global.navigator) {
  global.addEventListener('load', () => {
    global.navigator.serviceWorker.register('sw.js');
  });
}
