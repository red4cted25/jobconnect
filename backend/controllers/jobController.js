const JobInfo = require('../models/jobs');
const User = require('../models/users'); 
const asyncWrapper = require('../middleware/async');
const cloudinary = require('cloudinary').v2;

const getAllJobs = asyncWrapper(async (req, res) => {
    const jobs = await JobInfo.find({});
    res.status(200).json({ success: true, data: jobs });
});

const createJob = asyncWrapper(async (req, res) => {
    const { title, company, location, remote, payRange, experienceLevel, description } = req.body;
    
    // Ensure that a logo is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Company logo is required.' });
    }

    try {
        // Using Cloudinary for image uploads
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
        const logoUrl = cloudinaryResponse.secure_url;

        const capitalizedLocation = location.toUpperCase();
        const jobData = {
            title,
            company,
            location: capitalizedLocation,
            remote: remote === 'true' || remote === true,
            payRange: {
                min: req.body['payRange.min'],
                max: req.body['payRange.max'],
                currency: req.body['payRange.currency'] || 'USD',
                unit: req.body['payRange.unit'] || 'hour'
            },
            experienceLevel,
            datePosted: new Date(),
            description,
            logo: logoUrl, 
            education: req.body.education
        };

        await JobInfo.create(jobData);  
        res.status(201).json({ success: true, message: 'Job created successfully' });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
});

const getJobProfile = asyncWrapper(async (req, res) => {
    const { id: jobID } = req.params; 
    const job = await JobInfo.findOne({ _id: jobID });
    if (!job) {
        return res.status(404).json({ success: false, message: `No job with id: ${jobID}` });
    }
    
    res.status(200).json({ success: true, data: job });
});

const deleteJob = asyncWrapper(async (req, res) => {
    const { id: jobID } = req.params;  
    const job = await JobInfo.findOne({ _id: jobID });

    if (!job) {
        return res.status(404).json({ success: false, message: `No job with id: ${jobID}` });
    }

    // Delete the job from the database
    await JobInfo.findOneAndDelete({ _id: jobID });

    res.status(200).json({ success: true, message: 'Job deleted successfully' }); 
});

const updateJob = asyncWrapper(async (req, res) => {
    const { id: jobID } = req.params;
    
    // Extract the updated data
    let updateData = { ...req.body };

    // Handle payRange properly
    if (req.body['payRange.min'] || req.body['payRange.max']) {
        updateData.payRange = {
            min: req.body['payRange.min'] || undefined,
            max: req.body['payRange.max'] || undefined,
            currency: req.body['payRange.currency'] || 'USD',
            unit: req.body['payRange.unit'] || 'hour'
        };
        
        // Remove the dot notation fields
        delete updateData['payRange.min'];
        delete updateData['payRange.max'];
        delete updateData['payRange.currency'];
        delete updateData['payRange.unit'];
    }

    // If there's a new logo uploaded
    if (req.file) {
        updateData.logo = req.file.path;
    }

    // Convert remote from string to boolean if needed
    if (updateData.remote) {
        updateData.remote = updateData.remote === 'true' || updateData.remote === true;
    }

    // Perform the update
    const updatedJob = await JobInfo.findOneAndUpdate(
        { _id: jobID },
        updateData,
        {
            new: true,           
            runValidators: true  
        }
    );

    if (!updatedJob) {
        return res.status(404).json({ success: false, message: `Job with id ${jobID} not found.` });
    }

    res.status(200).json({ success: true, data: updatedJob });
});

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({}).select('-password');
    return res.status(200).json({ success: true, data: users });
});

const getAdminDashboard = asyncWrapper(async (req, res) => {
    const [jobs, users] = await Promise.all([
        JobInfo.find({}),
        User.find({}).select('-password')
    ]);
    res.status(200).json({ success: true, data: { jobs, users } });
});

const deleteUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params; 
    const user = await User.findOne({ _id: userID });

    if (!user) {
        return res.status(404).json({ success: false, message: `No user with id: ${userID}` });
    }

    await User.findOneAndDelete({ _id: userID });

    res.status(200).json({ success: true, message: 'User deleted successfully' }); 
});

module.exports = {
    getAllJobs,
    createJob,
    getJobProfile,
    deleteJob,
    updateJob,
    getAllUsers,
    deleteUser,
    getAdminDashboard
};