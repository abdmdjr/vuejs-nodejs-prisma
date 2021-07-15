const prisma = require('../prisma/prisma')

// Find many todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        tags: true,
      },
    });
    return res.json(todos);
  } catch (err) {
    console.error(err);
  }
};

// Create a new Todo and connect it to an existing Tags via tag.id
const addNewTodoAndBindTagsWith = async (req, res) => {
  try {
    const { todo } = req.body;
    const idTag = await todo.tags.map((tag) => {
      return {
        id: tag.id,
      };
    });
    const newTodo = await prisma.todo.create({
      data: {
        content: todo.content,
        tags: {
          connect: idTag, // [{id: 1}, {id: 2}, {id: 3} ...]
        },
      },
      include: {
        tags: true,
      },
    });
    return res.json(newTodo);
  } catch (err) {
    console.error(err);
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = +req.params.id;
    const { todo } = req.body;
    const todoUpdated = await prisma.todo.update({
      where: { id },
      data: {
        content: todo.content,
        done: todo.done,
      },
      include: {
        tags: true,
      },
    });
    return res.json(todoUpdated);
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = +req.params.id;
    const todoDeleted = await prisma.todo.delete({
      where: { id },
    });
    return res.json(todoDeleted);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllTodos,
  addNewTodoAndBindTagsWith,
  updateTodo,
  deleteTodo
};
