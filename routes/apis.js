const express = require('express');
const router = express.Router();

const { handleApiTodos } = require('../controllers/apis');

// GET all todos
router.get('/todos', handleApiTodos);

module.exports = router;