import Vue from 'vue';
import feather from 'vue-icon';
import Multiselect from 'vue-multiselect';
import InstantSearch from 'vue-instantsearch';
import App from './App.vue';
import store from './store';
import './assets/styles/tailwind.css';

Vue.config.productionTip = false;
Vue.use(InstantSearch);
Vue.use(feather, 'v-icon');
Vue.component('multiselect', Multiselect);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
