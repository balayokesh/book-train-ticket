const router = require('express').Router();
const Trains = require('../models/trains.model');

router.route('/').get((req, res) => {
    Trains.find()
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/search').get((req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    Trains.find({"departure_station": from, "arrival_station": to})
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const train_num = req.body.train_num;
    const train_name = req.body.train_name;
    const departure_time = req.body.departure_time;
    const departure_station = req.body.departure_station;
    const arrival_time = req.body.arrival_time;
    const arrival_station = req.body.arrival_station;

    newTrain = new Trains({
        train_num, train_name, departure_time, departure_station, arrival_time, arrival_station
    });

    newTrain.save()
        .then(() => res.json(`Train ${train_name} information added successfully`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;