const express = require('express');
const { check } = require('express-validator');
const { addCandidateAndSendEmail, getAllCandidates } = require('../controllers/candidateController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a candidate and send an email (POST /api/candidates)
router.post('/', [
    authMiddleware,  // Protect this route
    check('name', 'Candidate name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('jobId', 'Job ID is required').not().isEmpty()
], addCandidateAndSendEmail);

// Get all candidates
router.get('/', authMiddleware, getAllCandidates);

module.exports = router;
