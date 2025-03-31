const jwt = require('jsonwebtoken');
const User = require('../models/users'); 
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter for authentication attempts
const authRateLimiter = new RateLimiterMemory({
    points: 15, // 5 attempts
    duration: 15 * 60, // per 15 minutes
});

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and attach to request
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if user account is active/verified
        if (user.isVerified === false) {
            return res.status(403).json({ message: 'Account not verified' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Rate limiting middleware
const rateLimitAuth = async (req, res, next) => {
    try {
        const ip = req.ip;
        await authRateLimiter.consume(ip);
        next();
    } catch (error) {
        res.status(429).json({ 
            message: 'Too many authentication attempts. Please try again later.' 
        });
    }
};

module.exports = {
    authenticateToken,
    rateLimitAuth
};