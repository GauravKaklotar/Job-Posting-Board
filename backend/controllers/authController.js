const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a company
exports.registerCompany = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, password } = req.body;

    try {
        // Check if company already exists
        let company = await Company.findOne({ email });
        if (company) {
            return res.status(400).json({ msg: 'Company already registered' });
        }

        // Create new company
        company = new Company({
            name,
            email,
            mobile,
            password
        });

        // Save the company
        await company.save();

        // Generate JWT
        const payload = {
            company: {
                id: company.id,
                isVerified: company.isVerified
            }
        };

        // Sign the token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Company login
exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if company exists
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = {
            company: {
                id: company.id,
                isVerified: company.isVerified
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
