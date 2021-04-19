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
        departure_time: {
            type: Date,
            required: true
        },
        departure_station: {
            type: String,
            required: true
        },
        arrival_time: {
            type: Date,
            required: true
        },
        arrival_station: {
            type: String,
            required: true
        },
    }
)

const trains = mongoose.model('Trains', trainSchema)
module.exports = trains;