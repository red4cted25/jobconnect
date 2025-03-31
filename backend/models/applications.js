const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, enum: ['pending', 'reviewed', 'rejected', 'accepted'], default: 'pending' },
    resume: { type: String }, // URL to resume file
    coverLetter: { type: String },
    additionalQuestions: { type: Map, of: String }, // For job-specific questions
    appliedAt: { type: Date, default: Date.now }
});

module.exports = Application = mongoose.model('Application', ApplicationSchema);