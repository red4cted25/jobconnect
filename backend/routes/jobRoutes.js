const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/jobs');
const { getJobs } = require('../controllers/jobController');

router.get('/', getJobs);

router.get('/:id', async (req, res) => {
    console.log("GET /api/jobs/:id route reached with id:", req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log("Invalid ObjectId:", req.params.id);
        return res.status(400).json({ message: "Invalid job id" });
    }
    const job = await Job.findById(req.params.id); // if this throws an error, it will crash and show full details
    if (!job) {
        console.log("Job not found for id:", req.params.id);
        return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
});

module.exports = router;