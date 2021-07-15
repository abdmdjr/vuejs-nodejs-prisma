const indexTodosSearch = require("../meilisearch");
const prisma = require("../prisma/prisma");

const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        tags: true,
      },
    });
    await indexTodosSearch.addDocuments(todos);
    return res.json(todos);
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = +req.params.id;
    await indexTodosSearch.deleteDocument(id)
    return res.json(id);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllTodos,
  deleteTodo
};
