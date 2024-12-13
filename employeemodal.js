const mongoose = require('mongoose');

const empoyeeschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        position: {
            type: String,
            required: true 
        },

        department: {
            type: String,
            required: true
        },

        shift:{
            type: String,
            required: true
        },

    }
);

module.exports = mongoose.model ("employeedata", empoyeeschema);