const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getTodos } = require('./apis');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const handleHome = async (req, res) => {
    if (req.user) {
        try {
            const todos = await getTodos(req.user._id);
            res.render('home', { todos: todos, user: req.user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.render('index', { user: null });
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ user: { _id: user._id, email: user.email, username: user.username } }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const handleLoginUi = (req, res) => {
    res.render('login');
}

const handleSignupUi = (req, res) => {
    res.render('signup');
}

const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        pwdHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash: pwdHash
        });

        await newUser.save();
        res.status(201).redirect('/login');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const handleLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
}

const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
}

module.exports = { handleSignupUi, handleSignup, handleLoginUi, handleLogin, handleHome, handleLogout, ensureAuthenticated };