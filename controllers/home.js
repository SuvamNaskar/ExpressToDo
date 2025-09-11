const User = require('../models/Users');
const bcrypt = require('bcrypt');

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

module.exports = { handleSignupUi, handleSignup };