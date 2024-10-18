const express = require('express');
const { check } = require('express-validator');
const { createJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a job (POST /api/jobs)
router.post('/', [
    authMiddleware,  // Protect this route
    check('title', 'Job title is required').not().isEmpty(),
    check('description', 'Job description is required').not().isEmpty(),
    check('experienceLevel', 'Experience level is required').isIn(['Entry', 'Mid', 'Senior']),
    check('endDate', 'End date is required').not().isEmpty()
], createJob);

module.exports = router;
