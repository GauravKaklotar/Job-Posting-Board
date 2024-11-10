const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const Otp = require('../models/Otp');

// Twilio setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send OTP to company's mobile number
exports.sendOTP = async (req, res) => {
    const { mobile } = req.body;

    try {
        // Ensure the mobile number starts with +91 (Indian country code)
        const formattedMobile = mobile.startsWith('+91') ? mobile : '+91' + mobile;

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Store OTP in the company record or a separate OTP collection
        let company = await Company.findOne({ mobile });

        // If the company doesn't exist, return a 400 error
        if (!company) {
            return res.status(400).json({ msg: 'Company not registered' });
        }

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your verification OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Make sure this is correct
            to: formattedMobile, // Use the formatted mobile number
        }).then(message => {
            console.log("OTP sent successfully:", message.sid);
            res.status(200).json({ msg: 'OTP sent successfully' });
            otp = new Otp({
                mobileNumber,
                otp
            });
             otp.save();
        }).catch(err => {
            console.error("Error sending OTP:", err);
            res.status(500).json({ msg: 'Failed to send OTP. Please try again.', error: err.message });
        });

    } catch (error) {
        console.error("Error in sendOTP:", error.message);
        res.status(500).send('Server error');
    }
};



exports.verifyOTP = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        // Find the company by mobile number
        let company = await Company.findOne({ mobile });
        if (!company) {
            return res.status(400).json({ msg: 'Company not registered' });
        }

        // Check if OTP exists and is not expired
        if (company.otp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        if (company.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'OTP has expired' });
        }

        // OTP is valid, mark the company as verified
        company.isVerified = true;
        company.otp = undefined; // Clear OTP after successful verification
        company.otpExpires = undefined; // Clear OTP expiration

        await company.save();

        res.status(200).json({ msg: 'Mobile verified successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

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
        if (company.isVerified)
             {
            const payload = {
                company: {
                    id: company.id,
                    isVerified: company.isVerified
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        }
         else{
            return res.status(400).json({ msg: 'Mobile verifications are pending' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
