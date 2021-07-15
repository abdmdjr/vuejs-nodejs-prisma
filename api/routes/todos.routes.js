const express = require("express");
const todosControllers = require("../controllers/todos.controllers");
const router = express.Router();

router.get("/api/todos", todosControllers.getAllTodos);
router.post("/api/todo/add", todosControllers.addNewTodoAndBindTagsWith);
router.put("/api/todo/update/:id", todosControllers.updateTodo);
router.delete("/api/todo/delete/:id", todosControllers.deleteTodo);

module.exports = router;
