const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const createJWT = require('../utils/auth');

exports.signin = (req, res) => {
    let { email, password } = req.body;
    Users.findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.json('Email not found');
            }
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result === true) {
                        let accessToken = createJWT (
                            user.email,
                            user._id,
                            3600
                        );
                        jwt.verify(accessToken, process.env.TOKEN_SECRET)
                            .then((decoded) => {
                                if (decoded) res.json(user);
                                else res.json('Token verification failed');
                            })
                            .catch((err) => res.status(400).json(err)); 
                    }
                    else {
                        res.json('Password doesn\'t match');
                    }
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json('Email doesn\'t exists'));
}

exports.signup = (req, res) => {
    let { email, userName, password } = req.body;
    Users.findOne({email: email})
        .then((user) => {
            if (user) {
                return res.json('user already exist');
            }
            else {
                const details = new Users ({
                    email: email, 
                    userName: userName, 
                    password: password
                });
                // Hash password
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        details.password = hash;
                        // Store record to db
                        details.save()
                            .then((response) => res.json(response))
                            .catch((err) => res.status(500).json(`Error: ${err}`));
                    });
                });
            }
        })
        .catch((err) => res.json(err));
}