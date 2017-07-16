import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.silent = process.env.NODE_ENV === 'production';
Vue.config.devtools = process.env.NODE_ENV !== 'production';
Vue.config.performance = process.env.NODE_ENV !== 'production';
