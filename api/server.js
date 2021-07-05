const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express(), port = 3080;

app.use(express.json())

app.get('/api/todos', async (req, res) => {
  const todos = await prisma.todo.findMany({
    include: {
      tags: true
    }
  })
  res.json(todos)
});

app.post('/api/new-todo', async (req, res) => {
  const { todo } = req.body;
  const idTag = todo.tags.map((el) => {
    return obj = {
      id: el.id
    }
  })
  const newTodo = await prisma.todo.create({
    data: {
      content: todo.content,
      tags: {
        connect: idTag
      }
    },
    include: {
      tags: true
    }
  })
  res.json(newTodo)
});

app.put('/api/done/:id', async (req, res) => {
  const id = +req.params.id
  const { todo } = req.body
  console.log(todo)
  const todoUpdated = await prisma.todo.update({
    where: { id },
    data: {
      content: todo.content,
      done: todo.done
    },
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

app.get('/api/tags', async (req, res) => {
  const tags = await prisma.tag.findMany()
  res.json(tags)
});

app.post('/api/new-tag', async (req, res) => {
  const tag = req.body;
  const newTag = await prisma.tag.create({
    data: {
      title: tag.title
    }
  })
  res.json(newTag);
})

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});