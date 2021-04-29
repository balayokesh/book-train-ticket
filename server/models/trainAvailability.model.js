const mongoose = require('mongoose');

const trainAvailabilitySchema = new mongoose.Schema (
    {
        train_id: {
            type: String,
            required: true,
        },
        train_class: {
            type: String,
            required: true
        },
        availability: {
            total_seats: { type: Number, default: 0 },
            reserved: { type: Number, default: 0 }
        }
    },
    {
        timestamps: true
    }
);

const trainAvailability = mongoose.model('TrainAvailability', trainAvailabilitySchema)
module.exports = trainAvailability;