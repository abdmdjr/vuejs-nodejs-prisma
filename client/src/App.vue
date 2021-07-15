<template>
  <div class="h-max flex flex-col justify-evenly">
    <search-todo />
    <todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import SearchTodo from './components/SearchTodo.vue';

export default {
  name: 'App',
  components: {
    SearchTodo,
    TodoList,
  },
};
</script>
