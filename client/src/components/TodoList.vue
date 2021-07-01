<template>
  <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <h1 class="text-gray-600">
          My Todos with
          <span class="font-bold text-blue-600">Prisma</span>
        </h1>
        <div class="flex mt-4">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 focus:outline-none ring-1 ring-blue-600 focus:ring-2"
            placeholder="Add Todo"
            v-model="todo.content"
            @keyup.enter="addTodo()"
          />
          <button
            class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-blue-900 hover:bg-gray-100"
            @click="addTodo()"
          >
            <v-icon class="icon-add" name="plus"></v-icon>
          </button>
        </div>
      </div>
      <div>
        <div>
          <li
            :key="todo.id"
            v-for="todo in filterTodosPending"
            class="flex items-center odd:bg-gray-50 py-3 px-4"
          >
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
            <button @click="modeEdit(todo)">
              <v-icon class="icon-edit hover:text-blue-400 mx-3" name="edit-2"></v-icon>
            </button>
            <button @click="deleteTodo(todo)">
              <v-icon class="icon-delete hover:text-red-400" name="minus"></v-icon>
            </button>
          </li>
        </div>
        <div class="mt-10">
          <h1 class="px-5 py-3 font-bold bg-blue-200 text-blue-600">Done</h1>
          <li
            :key="todo.id"
            v-for="todo in filterTodosDone"
            class="flex items-center bg-blue-50 py-3 px-4"
          >
            <input type="checkbox" class="mr-3" @change="updateTodo(todo)" v-model="todo.done" />
            <p :class="todo.done ? 'line-through' : 'no-underline'" class="w-full">
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
import moduleTodosMixin from '@/store/todos/moduleTodosMixin';

export default {
  mixins: [moduleTodosMixin],
  computed: {
    filterTodosPending() {
      return this.$store.state.todos.todos.filter((t) => t.done === false);
    },
    filterTodosDone() {
      return this.$store.state.todos.todos.filter((t) => t.done === true);
    },
  },
  data() {
    return {
      todos: [],
      todosLocal: [],
      todo: {
        content: '',
        done: false,
      },
      isEditing: false,
      currentTodoId: Number,
    };
  },
  methods: {
    fetchTodos() {
      this.$store.dispatch('todos/fetchTodos');
    },
    async updateTodo(todo) {
      await this.$store.dispatch('todos/updateTodo', todo);
      this.fetchTodos();
    },
    addTodo() {
      if (this.todo.content) {
        this.$store.dispatch('todos/addTodo', this.todo);
      }
      this.todo.content = '';
    },
    editTodo() {
      this.isEditing = !this.isEditing;
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
  width: 22px;
}
</style>
