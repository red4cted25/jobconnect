const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must provide job title'],
        trim: true,
    },
    company: {
        type: String,
        required: [true, 'Must provide company name'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Must provide location'],
        trim: true,
    },
    remote: {
        type: Boolean,
        default: false
    },
    payRange: {
        min: {
            type: Number,
            required: false
        },
        max: {
            type: Number,
            required: false
        },
        currency: {
            type: String,
            default: 'USD'
        },
        unit: {
            type: String,
            default: 'hour',
            enum: ['hour', 'day', 'week', 'month', 'year']
        }
    },
    experienceLevel: {
        type: String,
        required: [true, 'Must provide experience level'],
        enum: ['Entry', 'Intermediate', 'Senior', 'Executive'],
        trim: true,
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: [true, 'Must provide job description'],
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
        required: [true, 'Must provide company logo']
    },
    education: {
        type: String,
        trim: true
    }
}, {collection: 'jobs'})

module.exports = mongoose.model('Job', JobSchema);