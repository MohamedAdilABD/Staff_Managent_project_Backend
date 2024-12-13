const mongoose = require('mongoose'); 

const leaverequestschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        department: {
            type: String,
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        reason: {
            type: String,
            required: true
        },

        days: {
            type: String,
            required: true
        },
        
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    }
);

module.exports = mongoose.model( "leaverequest", leaverequestschema);