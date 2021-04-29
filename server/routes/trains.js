const router = require('express').Router();
const Trains = require('../models/trains.model');
const TrainAvailability = require('../models/trainAvailability.model');

// Get all trains
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

router.route('/:id').get((req, res) => {
    Trains.findById(req.params.id)
        .then(train => res.json(train))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Add ticket availability for different classes
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
})

module.exports = router;
