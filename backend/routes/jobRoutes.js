const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { authenticateToken } = require('../middleware/authenticateToken');

const {
    getAllJobs,
    createJob,
    getJobProfile,
    deleteJob,
    deleteUser,
    getAdminDashboard,
    updateJob,
} = require('../controllers/jobController');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: "job-posting-site",
    allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage: storage });

// Home page route
router.route('/').get((req, res) => {
    res.json({ message: 'Welcome to the Job Posting API' });
});

// Jobs listing route
router.route('/listings').get(getAllJobs).post(async (req, res) => {
    const { title, location, experienceLevel } = req.body;
    const { clearFilters } = req.body;

    if (clearFilters) {
        return res.redirect('/api/jobs/listings');    
    }

    let filter = {};

    // Add filters based on the user's selection
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = location;
    
    // Handle experience level filter
    if (experienceLevel) {
        filter.experienceLevel = experienceLevel;
    }

    try {
        // Find jobs that match the filters
        const jobs = await Job.find(filter);

        // Return the jobs JSON
        res.status(200).json({ success: true, data: jobs });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ success: false, message: 'Error fetching jobs' });
    }
});

// Admin dashboard routes
router.route('/adminDashboard')
    .get(authenticateToken, getAdminDashboard)
    .post(authenticateToken, upload.single('logo'), createJob);

// Add job route
router.route('/addJob')
    .get(authenticateToken, (req, res) => res.json({ message: 'Add job form data' })) 
    .post(authenticateToken, upload.single('logo'), createJob); 

// Job profile route
router.route('/job-profile/:id').get(getJobProfile);

// Edit Job Route
router.route('/edit/:id')
    .get(authenticateToken, async (req, res) => {
        let job = await Job.findById(req.params.id);
        
        // If job not found, return error
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Return the job data
        res.status(200).json({ success: true, data: job });
    })
    .post(authenticateToken, upload.single('logo'), updateJob);

router.route('/job/delete/:id').post(authenticateToken, deleteJob);

router.route('/user/delete/:id').post(authenticateToken, deleteUser);

module.exports = router;