const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        remote: { type: Boolean, required: true },
        payRange: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String },
        unit: { type: String },
        },
        experienceLevel: { type: String },
        datePosted: { type: Date, required: true },
        desc: { type: String, required: true },
        logo: { type: String, default: "" }, // Optional: Can be blank or a URL to the company's logo
        education: { type: String },
        applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        },
        ], // An array to store references to applications
    },
    { collection: 'jobs' }
);

module.exports = mongoose.model('Job', jobSchema);
