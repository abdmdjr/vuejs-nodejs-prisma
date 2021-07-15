const express = require("express");
const logger = require("morgan");
const app = express(),
  port = 3080;

app.use(logger('dev'));
app.use(express.json());

const todosRouter = require('./routes/todos.routes');
const tagsRouter = require('./routes/tags.routes');
const meiliSearchRouter = require('./routes/meilisearch.routes');

app.use('/', todosRouter, tagsRouter, meiliSearchRouter);

app.listen(port, () => {
  console.log(`Server listening on the port:${port}`);
});
