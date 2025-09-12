const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { getTodos } = require('./apis');

const handleHome = async (req, res) => {
    try {
        const todos = await getTodos();
        res.render('index', { todos: todos });
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

        res.status(200).json({ message: 'Login successful' });
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
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleSignupUi, handleSignup, handleLoginUi, handleLogin, handleHome };