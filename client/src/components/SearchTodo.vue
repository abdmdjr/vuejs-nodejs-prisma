<template>
  <ais-instant-search class="mx-auto h-40" index-name="todos" :search-client="searchClient">
    <ais-autocomplete>
      <div slot-scope="{ currentRefinement, indices, refine }">
        <input
          class="p-2 rounded-md shadow-t-xl"
          type="search"
          :value="currentRefinement"
          placeholder="Search a todo"
          @input="refine($event.currentTarget.value)"
        />
        <div class="p-2 rounded-b-md shadow-md bg-white" v-if="currentRefinement">
          <ul v-for="index in indices" :key="index.indexId">
            <li>
              <ul>
                <li v-for="hit in index.hits" :key="hit.objectID">
                  <ais-highlight attribute="content" :hit="hit" />
                  <button
                    type="button"
                    class="bg-gray-500"
                    @click="index.sendEvent('click', hit, 'Item Added')"
                  ></button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </ais-autocomplete>
    <ais-refinement-list />
  </ais-instant-search>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import moduleTodosMixin from '@/store/todos/moduleTodosMixin';

export default {
  mixins: [moduleTodosMixin],
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    },
  },
  data() {
    return {
      searchClient: instantMeiliSearch('http://localhost:7700'),
    };
  },
};
</script>

<style></style>
