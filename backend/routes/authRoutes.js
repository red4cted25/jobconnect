const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/users');
const { authenticateToken, rateLimitAuth } = require('../middleware/authenticateToken');
const sendEmail = require('../utils/CloudinaryConfig');

// Register new user
router.post('/register', rateLimitAuth, async (req, res) => {
    try {
        const { email, password, firstName, lastName, username } = req.body;

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email 
                    ? 'Email already in use' 
                    : 'Username already exists' 
            });
        }

        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
            accountType: 'student',
            isVerified: false
        });

        // Save user
        await newUser.save();
        
        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error registering user', 
            error: error.message 
        });
    }
});

// Login route with enhanced security
router.post('/login', rateLimitAuth, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Create a JWT token
        const payload = {
            userId: user._id
        };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d' // token expires in 1 day
        });
    
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            alternateHomePage: user.alternateHomePage  // New field
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message 
        });
    }
});


module.exports = router;