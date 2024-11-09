// models/Otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        // Automatically delete the document once it's expired
        index: { expires: '5m' } // OTP expires in 5 minutes
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

// Create and export the model
const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
