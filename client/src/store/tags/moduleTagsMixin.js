import moduleTags from './moduleTags';

export default {
  created() {
    if (!moduleTags.isRegistered) {
      this.$store.registerModule('tags', moduleTags);
      moduleTags.isRegistered = true;
    }
  },
};
