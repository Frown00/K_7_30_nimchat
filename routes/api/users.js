const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: "Users works" })
);

// @route GET api/users/register
// @desc Register user
// @access Public
/**
 *  @api {post} api/users/register Register
 *  @apiName RegisterUser
 *  @apiGroup Users
 *  @apiPermission Public
 */
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);


    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw (err);

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

            }
        })
});


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
/**
 * @api {post} /api/users/login Login
 * @apiName UserLogin
 * @apiGroup Users
 * @apiPermission Public
 * @apiParam {String} email       user email address
 * @apiParam {String} password    user password
 */
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // user matched

                        // create jwt payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            status: "LOGGED_IN"
                        }

                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        })
});


// @route   GET api/users/current
// @desc    Returning current user
// @access  Private

/**
 * @api {get} api/users/current Get current user data
 * @apiName GetCurrentUser
 * @apiGroup Users
 * @apiPermission Private
 */
router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
            status: req.user.status
        });
    })

module.exports = router;