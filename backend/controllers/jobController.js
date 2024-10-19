const Job = require('../models/Job');
const Company = require('../models/Company');
const { sendEmail } = require('../utils/emailService');

exports.createJob = async (req, res) => {
    const { title, description, experienceLevel, endDate, candidates } = req.body;

    try {
        const job = new Job({
            title,
            description,
            experienceLevel,
            endDate,
            company: req.company.id
        });

        await job.save();

        // Send email to selected candidates
        const subject = `New Job Posting: ${title}`;
        const jobDetails = `Job Title: ${title}\nDescription: ${description}\nExperience Level: ${experienceLevel}`;
        candidates.forEach(async (candidateEmail) => {
            const emailText = `Dear candidate,\n\nYou have been notified about a new job posting:\n\n${jobDetails}`;
            await sendEmail(candidateEmail, subject, emailText);
        });

        res.status(201).json({ msg: 'Job posted and email notifications sent' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
