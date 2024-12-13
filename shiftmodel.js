const mongoose = require('mongoose');

const shiftschema = new mongoose.Schema(
    {
        employeeId: {
            tyep: mongoose.Schema.Types.ObjectId,
            ref: "employeedata",
            
        },
        
        starttime: {
            type: Date,
            required: true
        },

        endtime: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model( "shiftdata", shiftschema );