const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = config.get('secret');
const Joi = require('@hapi/joi');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthday: Date,
    created: {
        type: Date,
        default: Date.now(),
    },
    role: String,
    password: String,
    password_repeat: String,
});

const UserModel = mongoose.model('User', userSchema);

const userValidateSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(12).required(),
    created: Joi.date().max('1-1-2050').iso(),
    role: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,10}$/).required(),
    password_repeat: Joi.ref('password'),
});

router.post('/register', (req, res) => {
    const user = req.body;

    const { value, error } = userValidateSchema.validate(user);

    if (error) {
        const errors = error.details;
        res.json(errors);
        return;
    }

    const dbUser = new UserModel(value);
    const { email } = dbUser;

    UserModel.find({ email })
        .then((user) => {
            if (user.length) {
                res.status(400).json({ status: 'Email address already in use' });
                res.end();
                return;
            }

            dbUser.save((err) => {
                if (err) {
                    res.status(400).json({ status: 'Error occurred. Try again later' });
                    throw err;
                } else {
                    const user = {
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        role: dbUser.role,
                        email: dbUser.email,
                    };

                    const userToken = jwt.sign(user, secret);

                    res.json({ status: 'User successfully created', user: userToken });
                }
                res.end();
            });
        });
});

module.exports = router;
