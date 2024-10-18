const Job = require('../models/Job');
const Company = require('../models/Company');

// Create a new job
exports.createJob = async (req, res) => {
    const { title, description, experienceLevel, endDate } = req.body;

    try {
        // Check if company is verified
        const company = await Company.findById(req.company.id);
        if (!company.isVerified) {
            return res.status(403).json({ msg: 'You must verify your account to post jobs' });
        }

        // Create job
        const job = new Job({
            title,
            description,
            experienceLevel,
            endDate,
            company: req.company.id
        });

        await job.save();
        res.status(201).json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
