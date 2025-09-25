const express = require('express');
const router = express.Router();

const { handleApiTodos } = require('../controllers/apis');
const { ensureAuthenticated } = require('../controllers/home');

// GET all todos
router.get('/todos', ensureAuthenticated, handleApiTodos);

module.exports = router;