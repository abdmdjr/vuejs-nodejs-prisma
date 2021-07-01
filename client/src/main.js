import Vue from 'vue';
import feather from 'vue-icon';
import axios from 'axios';
import App from './App.vue';
import store from './store';
import './assets/styles/tailwind.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.use(feather, 'v-icon');

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
