const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { getTodos } = require('./apis');

const handleHome = async (req, res) => {
    try {
        const todos = await getTodos(req.session.user._id);
        res.render('index', { todos: todos, user: req.session.user });
    } catch (err) {
        res.status(500).json({ message: err.message });
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

        req.session.user = user;
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
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        res.redirect('/login');
    });
}

const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

module.exports = { handleSignupUi, handleSignup, handleLoginUi, handleLogin, handleHome, handleLogout, ensureAuthenticated };