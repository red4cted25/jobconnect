const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const Job = require("../models/job");

router.post("/applications", async (req, res) => {
    try {
        const applicationData = req.body;

        // Save the application
        const newApplication = new Application(applicationData);
        await newApplication.save();

        // Find the job and add the application reference
        const job = await Job.findById(applicationData.jobId);
        if (!job) {
        return res.status(404).json({ message: "Job not found" });
        }

        job.applications.push(newApplication._id);
        await job.save();

        res.status(201).json(newApplication);
    } catch (err) {
        res.status(500).json({ message: "Failed to submit application" });
    }
});

module.exports = router;
