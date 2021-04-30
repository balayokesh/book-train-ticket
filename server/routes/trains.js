const router = require('express').Router();

// Models used in this router
const Trains = require('../models/trains.model');
const TrainAvailability = require('../models/trainAvailability.model');
const TrainRoute = require('../models/trainRoute.model');

/*
    Existing Routes:
    /trains - fetch all from trains table
    /trains/add - add new document to trains table
    /trains/addseat - add new document to trainAvailability table
    /trains/addroute - add route for particular train id
    /trains/:id/availability - fetches all classes available in that particular train id
    /trains/:id/findroute - fetches all classes available in that particular train id
    /trains/:id/reservation - increments certain trains classes availability.reserved count
    /trains/:id/cancellation - decrements certain trains classes availability.reserved count
    /trains/:id - fetches train details from trains model
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

router.route('/addseat').post((req, res) => {
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

router.route('/addroute').post((req, res) => {
    const train_id = req.body.train_id;
    const from = req.body.from;
    const to = req.body.to;
    const from_station_time = req.body.from_station_time;
    const to_station_time = req.body.to_station_time;

    routeDetails = new TrainRoute ({
        train_id, from, to, from_station_time, to_station_time
    });

    routeDetails.save()
        .then(() => res.json(`Route for train: ${train_id} added successfully`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/availability').get((req, res) => {
    TrainAvailability.find({train_id: req.params.id})
        .then((availabilities) => res.json(availabilities))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/findroute').get((req, res) => {
    const train_id = req.params.id;
    const from = req.body.from;
    const to = req.body.to;

    if (from != '' && to != '') {
        filter = {train_id: train_id, from: from, to: to}
    }
    else if (from != '' && to == '') {
        filter = {train_id: train_id, from: from}
    }
    else if (from == '' && to != '') {
        filter = {train_id: train_id, to: to}
    }

    TrainRoute.find(filter)
        .then((routes) => res.json(routes))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})

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

router.route('/:id').get((req, res) => {
    Trains.findById(req.params.id)
        .then(train => res.json(train))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
