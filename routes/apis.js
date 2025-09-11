const express = require('express');
const router = express.Router();

const TodoModel = require('../models/Task');
const { handleApiTodos } = require('../controllers/apis');

const Todo = TodoModel;

// GET all todos
router.get('/todos', handleApiTodos);

module.exports = router;