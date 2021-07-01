import axios from 'axios';

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
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      state.totalTodo += 1;
    },
    UPDATE_TODO(state, todo) {
      const todoIndex = state.todos.findIndex((el) => el.id === todo.id);
      state.todos[todoIndex] = todo;
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
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async addTodo({ commit }, todo) {
      try {
        const res = await axios.post('/api/new-todo', todo);
        commit('ADD_TODO', res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodo({ commit }, todo) {
      let res = {};
      try {
        res = await axios.put(`/api/done/${todo.id}`, todo);
        commit('UPDATE_TODO', res.data);
      } catch (err) {
        console.log(err);
      }
      return res.data;
    },
    async deleteTodo({ commit }, todoId) {
      try {
        await axios.delete(`/api/delete/${todoId}`);
        commit('DELETE_TODO', todoId);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
