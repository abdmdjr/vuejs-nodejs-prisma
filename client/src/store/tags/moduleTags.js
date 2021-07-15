import axios from 'axios';

export default ({
  isRegistered: false,
  namespaced: true,
  state: {
    tags: [],
    totalTags: 0,
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
      state.totalTags = tags.length;
    },
    ADD_TAG(state, tag) {
      state.tags.push(tag);
      state.totalTags += 1;
    },
  },
  actions: {
    async fetchTags({ commit }) {
      let res = [];
      try {
        res = await axios.get('/api/tags');
        commit('SET_TAGS', res.data);
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async addTag({ commit }, tag) {
      try {
        const res = await axios.post('/api/tag/add', tag);
        commit('ADD_TAG', res.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
