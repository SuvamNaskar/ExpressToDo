require('dotenv').config();
const express = require('express');
const router = express.Router();
const { handleSignupUi, handleSignup } = require('../controllers/home');
const TodoModel = require('../models/Task');

const Todo = TodoModel;


// GET all todos and render the index page
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.render('index', { todos: todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/signup', handleSignupUi)

router.post('/signup', handleSignup )

module.exports = router;