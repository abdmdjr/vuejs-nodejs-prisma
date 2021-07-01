const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express(), port = 3080;

app.use(express.json())

app.get('/api/todos', async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
});

app.post('/api/new-todo', async (req, res) => {
  const todo = req.body;
  const newTodo = await prisma.todo.create({
    data: {
      content: todo.content
    }
  })
  res.json(newTodo)
});

app.put('/api/done/:id', async (req, res) => {
  const id = +req.params.id
  const todo = req.body
  const todoUpdated = await prisma.todo.update({
    where: { id },
    data: { ...todo }
  })
  res.json(todoUpdated)
})

app.delete('/api/delete/:id', async (req, res) => {
  const id = +req.params.id
  const todoDeleted = await prisma.todo.delete({
    where: { id },
  })
  res.json(todoDeleted)
})

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});