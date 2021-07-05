<template>
  <div
    class="container w-full h-screen flex flex-col items-center justify-center bg-teal-lightest font-sans px-10"
  >
    <h1 class="flex items-center mb-5 font-light text-xl text-gray-600">
      <span class="mt-1">Todolist</span>
      <img src="@/assets/prisma-2.svg" width="120" class="ml-3" />
    </h1>
    <div class="bg-white rounded shadow p-6 m-4 w-full">
      <div class="mb-4">
        <create-todo @on-new-todo="addTodo($event)" @on-new-tag="addTag($event)" />
      </div>
      <div>
        <div>
          <li
            :key="todo.id"
            v-for="todo in todoPending"
            class="flex justify-between odd:bg-gray-50 py-3 px-4"
          >
            <div class="flex items-center">
              <input type="checkbox" class="mr-3" @change="updateTodo(todo)" v-model="todo.done" />
              <input
                v-if="todo.id === currentTodoId && isEditing"
                @change="updateTodo(todo)"
                class="w-full mx-3 py-1 px-3 rounded focus:outline-none ring-1 ring-blue-600 focus:ring-2"
                type="text"
                v-model="todo.content"
              />
              <p v-else :class="todo.done ? 'line-through' : 'no-underline'" class="w-full">
                {{ todo.content }}
              </p>
              <div v-for="tag in todo.tags" :key="tag.id">
                <div
                  class="w-max ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-2.5 py-0.5 bg-blue-200 text-blue-700 rounded-full"
                >
                  {{ tag.title }}
                </div>
              </div>
            </div>
            <div class="flex">
              <button @click="modeEdit(todo)">
                <v-icon class="icon-edit hover:text-blue-400 mx-3" name="edit-2"></v-icon>
              </button>
              <button @click="deleteTodo(todo)" class="w-auto">
                <v-icon class="icon-delete hover:text-red-400" name="minus"></v-icon>
              </button>
            </div>
          </li>
        </div>
        <div class="mt-10">
          <h1 class="px-5 py-3 font-bold bg-blue-200 text-blue-600">Done</h1>
          <li
            :key="todo.id"
            v-for="todo in todoDone"
            class="flex items-center bg-blue-50 py-3 px-4"
          >
            <input type="checkbox" class="mr-3" @change="updateTodo(todo)" v-model="todo.done" />
            <p class="w-full" :class="todo.done ? 'line-through' : 'no-underline'">
              {{ todo.content }}
            </p>
            <button @click="deleteTodo(todo)">
              <v-icon class="icon-delete hover:text-red-400" name="minus"></v-icon>
            </button>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createTodo from '@/components/CreateTodo.vue';
import moduleTodosMixin from '@/store/todos/moduleTodosMixin';
import moduleTagsMixin from '@/store/tags/moduleTagsMixin';

export default {
  mixins: [moduleTodosMixin, moduleTagsMixin],
  components: {
    createTodo,
  },
  computed: {
    todoPending() {
      return this.$store.getters['todos/filterTodosPending'];
    },
    todoDone() {
      return this.$store.getters['todos/filterTodosDone'];
    },
  },
  data() {
    return {
      todo: {
        content: '',
        done: false,
        tags: [],
      },
      isEditing: false,
      currentTodoId: Number,
    };
  },
  methods: {
    fetchTodos() {
      this.$store.dispatch('todos/fetchTodos');
    },
    addTodo(newTodo) {
      this.$store.dispatch('todos/addTodo', newTodo);
    },
    addTag(newTag) {
      this.$store.dispatch('tags/addTag', newTag);
    },
    updateTodo(todo) {
      this.$store.dispatch('todos/updateTodo', todo);
    },
    deleteTodo(todo) {
      this.$store.dispatch('todos/deleteTodo', todo.id);
    },
    modeEdit(todo) {
      this.currentTodoId = todo.id;
      this.isEditing = !this.isEditing;
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped lang="scss">
.icon {
  width: 17px;
}
</style>
