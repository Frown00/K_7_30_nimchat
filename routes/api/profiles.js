const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const Personality = require('../../models/Personality');

// @route   GET api/profile/test
// @dest    Test profile route
// @access  Public
router.get('/test',
    (req, res) => res.json(
        {
            msg: "Profile works"
        }));


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    Profile.findOne({
        handle: req.params.handle
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
/**
 * @api {get} api/profiles/user/:user_id Get profile of specific user
 * @apiName GetUserProfile
 * @apiGroup Profiles
 * @apiPermission Public
 * @apiParam {Number} user_id Unique user id
 */
router.get('/user/:user_id', (req, res) => {
    Profile.findOne({
        user: req.params.user_id
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
/**
 * @api {get} api/profiles/all Get all profiles
 * @apiName GetAllProfiles
 * @apiGroup Profiles
 * @apiPermission Public
 */
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles)
        })
        .catch(err =>
            res.status(404).json({ profile: 'There are no profiles' })
        );
})

// @route   GET api/profiles
// @desc    Get current users profile
// @access  Private
/**
 * @api {get} api/profiles Get current user profile
 * @apiName GetCurrentUserProfile
 * @apiGroup Profiles
 * @apiPermission Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'Thers is no profile for this user';
                    return res.status(404).json(errors);
                }
                profile["age"] = profile["age"] > 0 ? profile["age"] : '';
                console.log(profile);
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   POST api/profiles/edit
// @desc    Create user profiles
// @access  Private
/**
 * @api {post} api/profiles/edit Edit current user profile
 * @apiName EditCurrentUserProfile
 * @apiGroup Profiles
 * @apiPermission Private
 */
router.post(
    '/edit',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const handleRandom = require('../../utilities/randomId');
        req.body.handle = handleRandom();
        const { errors, isValid } = validateProfileInput(req.body);


        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;

        // string fields
        if (req.body.handle)
            profileFields.handle = req.body.handle;

        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;

        // enums
        if (req.body.sex) profileFields.sex = req.body.sex;
        if (req.body.motivation) profileFields.motivation = req.body.motivation;
        if (req.body.maritalStatus) profileFields.maritalStatus = req.body.maritalStatus;


        // number fields
        if (req.body.age) profileFields.age = req.body.age;

        // one from list
        if (req.body.personality) profileFields.personality = req.body.personality;
        if (req.body.profession) profileFields.profession = req.body.profession;

        // array fields
        if (req.body.hobbies) {
            profileFields.hobbies = req.body.hobbies.split(',');
            profileFields.hobbies = profileFields.hobbies.map(hobby => {
                return hobby.trim();
            }
            );

        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    // Update
                    findPersonalityByName(profileFields.personality)
                        .then((personality) => {
                            if (personality) {
                                return Promise.all([personality, findProfessionByName(profileFields.profession)])
                            }
                            else {
                                errors.personality = "This personality doesn't exist. If it is please contact with us!";
                                return Promise.all([{}, findProfessionByName(profileFields.profession)])
                            }
                        })
                        .then(([personality, profession]) => {
                            if (profession) {
                                return Promise.all([personality, profession, findHobbiesByName(profileFields.hobbies)])
                            }
                            else {
                                errors.profession = "This profession doesn't exist. If it is please contact with us!"
                                return Promise.all([personality, {}, findHobbiesByName(profileFields.hobbies)])
                            }
                        })
                        .then(([personality, profession, hobbies]) => {
                            profileFields.personality = personality;
                            profileFields.profession = profession;
                            profileFields.hobbies = hobbies;

                            Profile.findOneAndUpdate(
                                { user: req.user.id },
                                { $set: profileFields },
                                { new: true }
                            ).then(profile => res.json(profile));
                        })


                } else {
                    // Create
                    console.log(profileFields);
                    //
                    Profile.findOne({ handle: profileFields.handle }).then(profile => {
                        if (profile) {
                            errors.handle = "That handle already exists";
                            res.status(400).json(errors);
                        }

                        // Save
                        findPersonalityByName(profileFields.personality)
                            .then((personality) => {
                                if (personality) {
                                    return Promise.all([personality, findProfessionByName(profileFields.profession)])
                                }
                                else {
                                    errors.personality = "This personality doesn't exist. If it is please contact with us!";
                                    return Promise.all([{}, findProfessionByName(profileFields.profession)])
                                }
                            })
                            .then(([personality, profession]) => {
                                if (profession) {
                                    return Promise.all([personality, profession, findHobbiesByName(profileFields.hobbies)])
                                }
                                else {
                                    errors.profession = "This profession doesn't exist. If it is please contact with us!"
                                    return Promise.all([personality, {}, findHobbiesByName(profileFields.hobbies)])
                                }
                            })
                            .then(([personality, profession, hobbies]) => {
                                profileFields.personality = personality;
                                profileFields.profession = profession;
                                profileFields.hobbies = hobbies;

                                new Profile(profileFields).save().then(profile => res.json(profile));


                            })
                    })
                }
            })
    }
);

function findPersonalityByName(personality) {
    return Personality.findOne({ name: personality });
}

function findProfessionByName(profession) {
    return Profession.findOne({ name: profession });
}

function findHobbiesByName(hobbies) {
    return Hobby.find({
        'name': { $in: hobbies }
    }, ['name', 'type', 'effort'], function (err, docs) {
        if (docs) {
            console.log(docs);
        }
    });
}

module.exports = router;