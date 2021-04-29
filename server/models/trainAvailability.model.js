const mongoose = require('mongoose');

const trainAvailabilitySchema = new mongoose.Schema (
    {
        train_id: {
            type: Number,
            required: true,
            unique: true
        },
        train_class: {
            class_name: {
                total_availability: {
                    type: Number,
                    default: 0
                },
                reserved: {
                    type: Number,
                    default: 0
                }
            },
        },
    },
    {
        timestamps: true
    }
);

const trainAvailability = mongoose.model('TrainAvailability', trainAvailabilitySchema)
module.exports = trainAvailability;