import axios from 'axios';
import Vue from 'vue';
import cloneDeep from 'lodash.clonedeep';

export default ({
  isRegistered: false,
  namespaced: true,
  state: {
    todos: [],
    totalTodo: 0,
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
      state.totalTodo = todos.length;
    },
    ADD_TODO(state, newTodo) {
      state.todos.unshift(newTodo);
      state.totalTodo += 1;
    },
    UPDATE_TODO(state, todo) {
      const todoIndex = state.todos.findIndex((el) => el.id === todo.id);
      Vue.set(state.todos, todoIndex, todo);
    },
    DELETE_TODO(state, todoId) {
      const todoIndex = state.todos.findIndex((el) => el.id === todoId);
      state.todos.splice(todoIndex, 1);
      state.totalTodo -= 1;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      let res = [];
      try {
        res = await axios.get('/api/todos');
        commit('SET_TODOS', res.data);
        await axios.get('/api/meilisearch');
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async addTodo({ commit }, todo) {
      let res = {};
      try {
        res = await axios.post('/api/todo/add', { todo });
        commit('ADD_TODO', res.data);
        await axios.get('/api/meilisearch');
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async updateTodo({ commit }, todo) {
      let res = {};
      try {
        res = await axios.put(`/api/todo/update/${todo.id}`, { todo });
        commit('UPDATE_TODO', res.data);
        await axios.get('/api/meilisearch');
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async deleteTodo({ commit }, todoId) {
      try {
        await axios.delete(`/api/todo/delete/${todoId}`);
        commit('DELETE_TODO', todoId);
        await axios.delete(`/api/meilisearch/${todoId}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    todosCopy: (state) => cloneDeep(state.todos),
  },
});
