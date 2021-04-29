const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema (
    {
        train_num: {
            type: Number,
            required: true
        },
        train_name: {
            type: String,
            required: true
        },
        route: [
            {
                type: String,
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const trains = mongoose.model('Trains', trainSchema)
module.exports = trains;