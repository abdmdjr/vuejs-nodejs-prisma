import moduleTodos from './moduleTodos';

export default {
  created() {
    if (!moduleTodos.isRegistered) {
      this.$store.registerModule('todos', moduleTodos);
      moduleTodos.isRegistered = true;
    }
  },
};
