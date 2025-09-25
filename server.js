const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./mongo_connect');
const todoRoutes = require('./routes/Todos');
const homeRoute = require('./routes/home');
const apiRoutes = require('./routes/apis');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON in the request body
app.use(express.urlencoded({ extended: true })); // Allows us to parse URL-encoded form data
app.use(express.static('public'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set view engine
app.set('view engine', 'ejs');

app.use('/', homeRoute);
app.use('/todos', todoRoutes);
app.use('/api', apiRoutes);

// --- Start the Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});