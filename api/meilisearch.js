const { MeiliSearch } = require('meilisearch')

const client = new MeiliSearch({
    host: "http://meilisearch:7700",
  });

const index = client.index("todos");

module.exports = index;