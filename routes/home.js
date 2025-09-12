require('dotenv').config();
const express = require('express');
const router = express.Router();
const { handleSignupUi,
        handleSignup,
        handleLoginUi,
        handleLogin,
        handleHome } = require('../controllers/home');

router.get('/', handleHome)

router.get('/signup', handleSignupUi)
router.post('/signup', handleSignup )

router.get('/login', handleLoginUi)
router.post('/login', handleLogin )

module.exports = router;