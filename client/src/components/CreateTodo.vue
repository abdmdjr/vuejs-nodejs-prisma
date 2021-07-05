<template>
  <div class="flex mt-4">
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 focus:outline-none ring-1 ring-blue-600 focus:ring-2"
      placeholder="Add Todo"
      v-model="todo.content"
      @keyup.enter="addTodo()"
    />
    <multiselect
      class="mr-4"
      v-model="todo.tags"
      :multiple="true"
      :options="tags"
      :showLabels="false"
      :taggable="true"
      @tag="addTag"
      label="title"
      trackBy="id"
      placeholder="Choose or add tag"
      tag-placeholder="Add this as new tag"
    ></multiselect>
    <button
      class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-blue-900 hover:bg-gray-100"
      @click="addTodo()"
    >
      <v-icon class="icon-add" name="plus"></v-icon>
    </button>
  </div>
</template>

<script>
import moduleTagsMixin from '@/store/tags/moduleTagsMixin';

export default {
  mixins: [moduleTagsMixin],
  computed: {
    tags() {
      return this.$store.state.tags.tags;
    },
  },
  data() {
    return {
      todo: {
        content: '',
        tags: [],
      },
    };
  },
  methods: {
    addTodo() {
      if (this.todo.content) {
        this.$emit('on-new-todo', this.todo);
      }
    },
    addTag(newTag) {
      const tagObject = {
        title: newTag,
      };
      this.$emit('on-new-tag', tagObject);
    },
    fetchTags() {
      this.$store.dispatch('tags/fetchTags');
    },
  },
  created() {
    this.fetchTags();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.icon {
  width: 22px;
}
</style>
