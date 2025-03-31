
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');
const Job = require('../models/jobs');
const User = require('../models/users');
const { authenticateToken } = require('../middleware/authenticateToken'); // Using your middleware

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/resumes');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only PDF, DOC, and DOCX files are allowed!');
        }
    }
});

// POST - Create new application
router.post('/', authenticateToken, upload.single('resume'), async (req, res) => {
    try {
        const { jobId, fullName, email, phone, coverLetter, additionalInfo } = req.body;
        
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Create application
        const application = new Application({
            user: req.user._id, // From your auth middleware - note the change to _id
            job: jobId,
            fullName,
            email,
            phone,
            coverLetter,
            additionalInfo,
            resume: req.file ? `/uploads/resumes/${req.file.filename}` : null
        });
        
        await application.save();
        
        // Optionally, update the user's applications array
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { applications: application._id } }
        );
        
        res.status(201).json(application);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET - Get all applications for logged in user
router.get('/my-applications', authenticateToken, async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id })
            .populate('job', 'title company location')
            .sort({ createdAt: -1 });
        
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET - Get application by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('job')
            .populate('user', 'name email');
        
        // Check if application exists
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        // Check if user owns this application or is the job poster
        const isOwner = application.user._id.toString() === req.user._id.toString();
        const isJobPoster = application.job.postedBy && application.job.postedBy.toString() === req.user._id.toString();
        
        if (!isOwner && !isJobPoster) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.json(application);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT - Update application status (for employers)
router.put('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status, notes } = req.body;
        
        const application = await Application.findById(req.params.id)
            .populate('job');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        // Check if user is the job poster
        const isJobPoster = application.job.postedBy && application.job.postedBy.toString() === req.user._id.toString();
        
        if (!isJobPoster) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        application.status = status;
        if (notes) application.notes = notes;
        
        await application.save();
        
        res.json(application);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE - Delete application
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        // Check if user owns this application
        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        await application.remove();
        
        // Remove application from user's applications array
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { applications: req.params.id } }
        );
        
        res.json({ message: 'Application deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;