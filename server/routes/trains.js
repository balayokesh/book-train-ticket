const router = require('express').Router();
const Trains = require('../models/trains.model');

router.route('/').get((req, res) => {
    Trains.find()
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/search').get((req, res) => {
    const from = req.body.from;
    const pickUpTime = req.body.pickUpTime;
    const to = req.body.to;
    let filter = {};

    // Only from is given || to, pickUptime is not given
    if (from != "" && to == "" && pickUpTime == "") {
        filter = {"departure_station": from, "arrival_station": to};    
    }
    // Only from and pickup time is given || to is not given
    else if (from != "" && pickUpTime != "" && arrival_station == from) {
        filter = {"departure_station": from, "departure_time": pickUpTime};    
    }
    // Only from and to is given || pickupTime is not given
    
    else if (from != "" && to != "" && pickUpTime == "") {
        filter = {"departure_station": from, "arrival_station": to};   
    }
    // Only to is given
    else if (to != "") {
        filter = {"arrival_station": to};
    }
    // From, To, pickUpTime is given
    else {
        filter = {"departure_station": from, "departure_time": pickUpTime, "arrival_station": to};
    }
    Trains.find(filter)
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/load-route').get((req, res) => {
    const from = req.body.from;

    // only from is given
    if (from != '') {
        Trains.find({"route": from})
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
    }
});

router.route('/add').post((req, res) => {
    const train_num = req.body.train_num;
    const train_name = req.body.train_name;
    const departure_time = req.body.departure_time;
    const departure_station = req.body.departure_station;
    const arrival_time = req.body.arrival_time;
    const arrival_station = req.body.arrival_station;
    const route = req.body.route;

    newTrain = new Trains({
        train_num, train_name, departure_time, departure_station, arrival_time, arrival_station, route
    });

    newTrain.save()
        .then(() => res.json(`Train ${train_name} information added successfully`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Trains.findById(req.params.id)
        .then(train => res.json(train))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
