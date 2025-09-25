const TodoModel = require('../models/Task');
require('dotenv').config();

const Todo = TodoModel;

const getTodos = async (userId) => {
    return await Todo.find({ user: userId }).sort({ createdAt: -1 });
}

const handleApiTodos = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const todos = await getTodos(req.session.user._id);
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleApiTodos, getTodos };