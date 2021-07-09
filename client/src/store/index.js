import Vue from 'vue';
import Vuex from 'vuex';
import moduleTodos from './todos/moduleTodos';
import moduleTags from './tags/moduleTags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleTodos,
    moduleTags,
  },
  strict: process.env.NODE_ENV !== 'production',
});
