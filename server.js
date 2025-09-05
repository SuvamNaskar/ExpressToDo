const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./mongo_connect');
const todoRoutes = require('./routes/Todos');
const homeRoute = require('./routes/home');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON in the request body
app.use(express.urlencoded({ extended: true })); // Allows us to parse URL-encoded form data
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

app.use('/', homeRoute);
app.use('/todos', todoRoutes);

// --- Start the Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});