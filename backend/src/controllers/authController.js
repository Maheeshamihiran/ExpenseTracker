const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Name, email, and password are required' 
        });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User already exists with this email' 
        });
      }

      // Create new user
      const user = await User.create({ name, email, password });
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { id: user.id, name: user.name, email: user.email },
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error: ' + error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email and password are required' 
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        success: true,
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error: ' + error.message 
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      res.json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
}

module.exports = AuthController;