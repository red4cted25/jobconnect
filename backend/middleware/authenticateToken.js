const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter for authentication attempts
const authRateLimiter = new RateLimiterMemory({
    points: 5, // 5 attempts
    duration: 15 * 60, // per 15 minutes
});

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Use the property 'id' because that's what we used in the token payload
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
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
