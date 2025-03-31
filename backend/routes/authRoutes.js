const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { authenticateToken, rateLimitAuth } = require('../middleware/authenticateToken');

// Generate JWT Token with more options
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            accountType: user.accountType
        }, 
        process.env.JWT_SECRET, 
        { 
            expiresIn:  '1d', // Token expires in 1 day
        }
    );
};

// Register new user
router.post('/register', rateLimitAuth, async (req, res) => {
    try {
        const { email, password, firstName, lastName, username } = req.body;

        // Validate input
        if (!email || !password || !firstName || !lastName || !username) {
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

        // Create new user
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            username,
            accountType: 'student',
            isVerified: false
        });

        // Save user
        await user.save();

        // Generate token
        const token = generateToken(user);

        // Respond with user and token
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accountType: user.accountType,
                isVerified: false
            }
        });
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
        const { email, password, rememberMe = false } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const token = generateToken(user, rememberMe);

        // Respond with user and token
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accountType: user.accountType,
                isVerified: true
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message 
        });
    }
});

// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find user with matching token and not expired
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: 'Verification token is invalid or has expired' 
            });
        }

        // Mark user as verified
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error verifying email', 
            error: error.message 
        });
    }
});

// Forgot Password Route
router.post('/forgot-password', rateLimitAuth, async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with that email' });
        }

        // Generate password reset token
        const resetToken = user.getResetPasswordToken();
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send email
        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message: `You are receiving this email because you (or someone else) has requested a password reset. 
                          Click the following link to reset your password: ${resetUrl}`
            });

            res.json({ message: 'Password reset email sent' });
        } catch (emailError) {
            // If email sending fails, clear the reset token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error processing password reset', 
            error: error.message 
        });
    }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash the token for comparison
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with matching token and not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: 'Password reset token is invalid or has expired' 
            });
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error resetting password', 
            error: error.message 
        });
    }
});

// Protected routes for user profile and settings
router.get('/profile', authenticateToken, (req, res) => {
    console.log('GET /profile - User ID:', req.user._id); // Log user ID for debugging
    res.json(req.user);
});

router.patch('/update', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, accountType } = req.body;
        
        // Update only the fields that are provided
        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (accountType) updateFields.accountType = accountType;

        // Find and update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            updateFields, 
            { 
                new: true, 
                runValidators: true,
                select: '-password' // Exclude password from returned document
            }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating user', 
            error: error.message 
        });
    }
});

module.exports = router;