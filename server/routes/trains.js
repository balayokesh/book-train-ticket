const router = require('express').Router();

// Models used in this router
const Trains = require('../models/trains.model');
const TrainAvailability = require('../models/trainAvailability.model');

/*
    Existing Routes:
    /trains - fetch all from trains table
    /trains/add - add new document to trains table
    /trains/add/seats - add new document to trainAvailability table
    /trains/:id/availability - fetches all classes available in that particular train id
    /trains/:id/reservation - increments certain trains classes availability.reserved count
    /trains/:id/cancellation - decrements certain trains classes availability.reserved count
*/

router.route('/').get((req, res) => {
    Trains.find()
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const train_num = req.body.train_num;
    const train_name = req.body.train_name;

    newTrain = new Trains({
        train_num, train_name
    });

    newTrain.save()
        .then(() => res.json(`Train ${train_name} information added successfully`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/addseats').post((req, res) => {
    const train_id = req.body.train_id;
    const train_class = req.body.train_class;
    const availability = req.body.availability;

    trainDetails = new TrainAvailability ({
        train_id, train_class, availability
    });

    trainDetails.save()
        .then(() => res.json(`Train ${train_id} details updation success.`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/availability').get((req, res) => {
    TrainAvailability.find({train_id: req.params.id})
        .then((availabilities) => res.json(availabilities))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/reservation').post((req, res) => {
    const class_id = req.body.class_id;
    TrainAvailability.findOneAndUpdate({_id: class_id}, {$inc: {"availability.reserved": 1 }})
        .then(() => res.json(`You booked class: ${class_id} at train ${req.params.id}`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/cancellation').post((req, res) => {
    const class_id = req.body.class_id;
    TrainAvailability.findOneAndUpdate({_id: class_id}, {$inc: {"availability.reserved": -1 }})
        .then(() => res.json(`You cancelled class: ${class_id} at train ${req.params.id}`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/search').get((req, res) => {
    const from = req.body.from;
    const pickUpTime = req.body.pickUpTime;
    const to = req.body.to;
    let filter = {};

    // Only from is given
    if (from != "" && to == "" && pickUpTime == "") {
        filter = {"departure_station": from, "arrival_station": to};    
    }
    // Only from and pickup time is given
    else if (from != "" && pickUpTime != "" && arrival_station == from) {
        filter = {"departure_station": from, "departure_time": pickUpTime};    
    }
    // Only from and to is given || pickupTime is not given
    
    else if (from != "" && to != "" && pickUpTime == "") {
        filter = {"departure_station": from, "arrival_station": to};   
    }
    // Only to is given
    else if (to != "" && from === "" && pickUpTime === "") {
        filter = {"arrival_station": to};
    }
    // From, To, pickUpTime is given
    else if (from != "" && pickUpTime != "" && arrival_station != "") {
        filter = {"departure_station": from, "departure_time": pickUpTime, "arrival_station": to};
    }

    Trains.find(filter)
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/load-route').get((req, res) => {
    const from = req.body.from;
    const to = req.body.to

    // From is given
    if (from != '' && to == '') {
        Trains.find({"route": from})
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
    }
    // From and to is given
    else if (from != '' && to != '') {
        Trains.find({"route": from, "route": to})
        .then(trains => res.json(trains))
        .catch(err => res.status(400).json(`Error: ${err}`));
    }
});

router.route('/:id').get((req, res) => {
    Trains.findById(req.params.id)
        .then(train => res.json(train))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
