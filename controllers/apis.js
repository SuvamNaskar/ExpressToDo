const TodoModel = require('../models/Task');
require('dotenv').config();

const Todo = TodoModel;

const getTodos = async () => {
    return await Todo.find().sort({ createdAt: -1 });
}

const handleApiTodos = async (req, res) => {
    const { apikey } = req.headers;

    if (apikey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const todos = await getTodos();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleApiTodos, getTodos };