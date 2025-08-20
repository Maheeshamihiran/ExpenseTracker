const express = require('express');
const AuthController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);

// Get user profile (protected route)
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;