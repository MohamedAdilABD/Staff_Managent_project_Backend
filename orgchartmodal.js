const mongoose = require('mongoose');

const orgchartschema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        
        position: {
            type: String,
            required: true
        },

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        }
    }
);

module.exports = mongoose.model( "orgchart", orgchartschema );