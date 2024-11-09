const express = require('express');
const { check } = require('express-validator');
const { registerCompany, loginCompany } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('mobile', 'Mobile is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], registerCompany);

// Login route
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginCompany);

module.exports = router;
