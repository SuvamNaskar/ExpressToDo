const mongoose = require('mongoose');
require('dotenv').config();

// --- Database Connection ---
const mongoURI = process.env.mongoURI; // Replace with your MongoDB Atlas URI if you're using it

const conn = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected successfully! ✅');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = conn;