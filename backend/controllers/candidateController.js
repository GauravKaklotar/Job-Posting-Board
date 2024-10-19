const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const { sendEmail } = require('../utils/emailService');

// Add candidate and send email
exports.addCandidate = async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if candidate with the same email already exists
        let existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ msg: 'Candidate with this email already exists' });
        }

        // Add the candidate to the database
        const candidate = new Candidate({
            name,
            email
        });

        await candidate.save();

        res.status(201).json({ msg: 'Candidate added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Get All candidate
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};