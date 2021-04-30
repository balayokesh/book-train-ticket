const mongoose = require('mongoose');

const TrainRouteSchema = new mongoose.Schema(
    {
        train_id: {
            type: String,
            required: true
        },
        from: {type: String},
        to: {type: String},
        from_station_time: {type: Date},
        to_station_time: {type: Date}
    },
    {
        timestamps: true
    }
);

const trainRoute = mongoose.model('TrainRoute', TrainRouteSchema);
module.exports = trainRoute;
