const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    resume: {
        type: String, // URL or base64 string for the resume
        required: false
    },
    coverLetter: {
        type: String, // URL or base64 string for the cover letter
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'hired', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Application', applicationSchema);
