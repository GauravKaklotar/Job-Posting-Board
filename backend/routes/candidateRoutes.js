const express = require('express');
const { check } = require('express-validator');
const { addCandidate, getAllCandidates } = require('../controllers/candidateController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a candidate 
router.post('/', authMiddleware, addCandidate);

// Get all candidates
router.get('/', authMiddleware, getAllCandidates);

module.exports = router;
