const express = require('express');
require('dotenv').config();
const TodoModel = require('../models/Task');

const router = express.Router();

const Todo = TodoModel;

// POST a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  try {
    const newTodo = await todo.save();
    // Check if the request was from fetch (AJAX)
    if (req.header('X-Requested-With') === 'XMLHttpRequest') {
      res.status(201).json(newTodo);
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST to toggle a todo's completed status
router.post('/toggle/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    if (req.header('X-Requested-With') === 'XMLHttpRequest') {
      res.status(200).json(todo);
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to delete a todo
router.post('/delete/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
    await todo.deleteOne();
    if (req.header('X-Requested-With') === 'XMLHttpRequest') {
      res.status(200).json({ message: 'Deleted Todo' });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;