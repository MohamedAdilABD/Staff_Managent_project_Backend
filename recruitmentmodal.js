const mongoose = require('mongoose');

const recruitementschema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        application: [
            {
                name: {
                    type: String,
                    required: true
                },

                email: {
                    type: String,
                    required: true
                },

                resumelink: {
                    type: String
                },

                status: {
                    type: String,
                    enum: ["applied", "interviewd", "hired", "rejected"],
                    default: "applied"
                }
            }
        ]
        
    }
);

module.exports = mongoose.model( "recruitement", recruitementschema );