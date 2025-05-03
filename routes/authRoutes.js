const express = require('express');
const router = express.Router();
const { registerUser , loginUser } = require('../controllers/authController');

//Sign Up Route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;