const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobId: {type: Number, required: true},
    title: {type: String, required: true},
    company: {type: String, required: true},
    location: {type: String, required: true},
    remote: {type: Boolean, required: true},
    payRange: {
        min: {type: Number},
        max: {type: Number},
        currency: {type: String},
        unit: {type: String},
    },
    experienceLevel: {type: String},
    datePosted: {type: Date, required: true},
    desc: {type: String, required: true},
    logo: {type: String, required: true},
    education: {type: String},
});

module.exports = mongoose.model('Job', jobSchema);