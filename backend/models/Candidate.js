const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true  
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
