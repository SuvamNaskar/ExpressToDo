const express = require('express');
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require('./routes/Todos');


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON in the request body
app.use(express.static('public'));

app.use('/todos', todoRoutes);

// --- Start the Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});