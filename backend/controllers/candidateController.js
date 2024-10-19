const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const { sendEmail } = require('../utils/emailService');

// Add candidate and send email
exports.addCandidateAndSendEmail = async (req, res) => {
    const { name, email, jobId } = req.body;

    try {
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Add candidate to the job
        const candidate = new Candidate({
            name,
            email,
            job: jobId
        });

        await candidate.save();

        // Send email notification
        const jobDetails = `Job Title: ${job.title}\nDescription: ${job.description}\nExperience Level: ${job.experienceLevel}`;
        const subject = `Job Alert: ${job.title}`;
        const emailText = `Dear ${name},\n\nYou have been added to the job posting:\n\n${jobDetails}`;

        await sendEmail(email, subject, emailText);

        res.status(201).json({ msg: 'Candidate added and email sent' });
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