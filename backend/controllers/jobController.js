const Job = require('../models/jobs');

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ success: true, data: jobs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = { getJobs };