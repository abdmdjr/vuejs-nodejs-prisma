<template>
  <div
    class="w-full flex flex-col items-center justify-center bg-teal-lightest"
  >
    <h1 class="flex items-center mb-5 font-light text-xl text-gray-600">
      <span class="mt-1">Todolist</span>
      <img src="@/assets/prisma-2.svg" width="120" class="ml-3" />
    </h1>
    <div class="bg-white rounded-md shadow-md p-6 m-4 w-full block">
      <div class="mb-4">
        <create-todo @on-new-todo="addTodo($event)" @on-new-tag="addTag($event)" />
      </div>
      <div>
        <p
          v-if="isTodosDone"
          class="flex justify-center pt-3 pb-6 px-3 font-light italic text-gray-400"
        >
          Tout est terminé, bravo <span class="pl-2 not-italic">🚀</span>
        </p>
        <p
          v-if="isTodosEmpty"
          class="flex justify-center pt-3 pb-6 px-3 font-light italic text-gray-400"
        >
          Rien à faire ? Allez, au boulot <span class="pl-2 not-italic">💻</span>
        </p>
        <li
          :key="todo.id"
          v-for="todo in todosPending"
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
                class="w-max ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-2.5 py-0.5 bg-blue-800 shadow-md text-white rounded-full"
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
        <div>
          <h1
            class="px-5 py-1 font-bold bg-gradient-to-r from-blue-800 to-blue-900 text-white"
            :class="isOneOrMoreTodosDone ? 'rounded-t-md' : 'rounded-md'"
          >
            Done
          </h1>
          <li
            :key="todo.id"
            v-for="todo in todosDone"
            class="flex justify-between bg-blue-50 py-3 px-4"
          >
            <div class="flex items-center">
              <input type="checkbox" class="mr-3" @change="updateTodo(todo)" v-model="todo.done" />
              <p :class="todo.done ? 'line-through' : 'no-underline'">
                {{ todo.content }}
              </p>
              <div
                v-for="tag in todo.tags"
                :key="tag.id"
                class="w-max ml-4 text-xs inline-flex font-bold leading-sm uppercase px-2.5 py-0.5 bg-blue-800 shadow-md text-white rounded-full"
              >
                {{ tag.title }}
              </div>
            </div>
            <button class="" @click="deleteTodo(todo)">
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
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

export default {
  mixins: [moduleTodosMixin, moduleTagsMixin],
  components: {
    createTodo,
  },
  computed: {
    todosCopy() {
      return this.$store.getters['todos/todosCopy'];
    },
    todosPending() {
      return this.todosCopy.filter((t) => t.done === false);
    },
    todosDone() {
      return this.todosCopy.filter((t) => t.done === true);
    },
    isOneOrMoreTodosDone() {
      return this.todosDone.length > 0;
    },
    isTodosDone() {
      return !this.todosPending.length && this.todosDone.length;
    },
    isTodosEmpty() {
      return !this.todosCopy.length;
    },
  },
  data() {
    return {
      isEditing: false,
      currentTodoId: Number,
      searchClient: instantMeiliSearch('http://localhost:7700'),
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
.MyCustomHits {
  padding: 15px;;
}
</style>
