const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');
const validateProfilePreferences = require('../../validation/profilePreferences');

const handleRandom = require('../../utilities/randomId');
const isEmpty = require('../../validation/isEmpty');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
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
                //console.log(profile);
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   POST api/profiles/edit
// @desc    Create user profiles or edit user profile 
// @access  Private
/**
 * @api {post} api/profiles/edit Edit current user profile
 * @apiName EditCurrentUserProfile or create one
 * @apiGroup Profiles
 * @apiPermission Private
 * @apiParam {String} handle Handle to user profile
 * @apiParam {String} sex User sex - one of option from "[MALE, FEMALE, OTHER]"
 * @apiParam {Number} age User age
 * @apiParam {String} location User location
 * @apiParam {String} motivation User motivation - one of option "['BORED', 'FRIENDS', 'LOVE', 'JUST_CHAT', 'OTHER']"
 * @apiParam {String} maritalStatus User mariatal status - one of option "['SINGLE', 'DIVORCED', 'MARRIED', 'WIDOWED', 'SEPARATED', 'ENGAGED', 'HAVE_PARTNER']"
 * @apiParam {String} personality User personality name
 * @apiParam {String} profession User profession name
 * @apiParam {String} hobbies User hobbies name separated by comma for example "Archery, Animation"
 * @apiParam {String} bio Description about user
 */
router.post(
    '/edit',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        req.body.handle = handleRandom();
        const { errors, isValid } = validateProfileInput(req.body);


        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Get fields
        let profileFields = {};
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
        if (req.body.personality)
            profileFields.personality = req.body.personality;
        else
            profileFields.personality = '';
        if (req.body.profession) {
            profileFields.profession = req.body.profession;
        } else {
            profileFields.profession = '';
        }
        // array fields
        if (req.body.hobbies) {
            profileFields.hobbies = req.body.hobbies.split(',');
            profileFields.hobbies = profileFields.hobbies.map(hobby => {
                return hobby.trim();
            }
            );

        } else {
            profileFields.hobbies = [];
        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    // Update
                    findAllProfileSubdocuments(profileFields.personality, profileFields.profession, profileFields.hobbies)
                        .then(([personality, profession, hobbies]) => {
                            profileFields.personality = personality;
                            profileFields.profession = profession;
                            profileFields.hobbies = hobbies;

                            // console.log(profilePersonality);
                            Profile.findOneAndUpdate(
                                { user: req.user.id },
                                {
                                    $set: profileFields
                                },
                                { new: true },
                            ).then(profile => res.json(profile))
                                .catch((err) => console.log(`Error when updating: ${err}`));
                        })
                } else {
                    // Create
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                handle =
                                    errors.handle = "That handle already exists";
                                res.status(400).json(errors);
                            }
                        });

                    // Save
                    findAllProfileSubdocuments(profileFields.personality, profileFields.profession, profileFields.hobbies)
                        .then(([personality, profession, hobbies]) => {

                            profileFields.personality = personality;
                            profileFields.profession = isEmpty(profession) ? null : profession;
                            profileFields.hobbies = hobbies;


                            new Profile(profileFields).save().then(profile => res.json(profile));


                        })
                        .catch((err) => console.log(`Error when creating user: ${err}`));
                }
            })
    }
);


/**
 * @api {get} api/profiles/preferences Request for all user partners profiles
 * @apiName GetAllPartnersProfiles
 * @apiGroup Profiles
 * @apiPermission Private
 */
router.get(
    '/preferences',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.body);
        const errors = {};
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOne(
                        { user: req.user.id },
                        ["partnersProfilePreference", "-_id"]
                    )
                        .then(profilesPreference => {
                            const preferences = profilesPreference.partnersProfilePreference;
                            if (preferences.length > 0) {
                                return res.json(preferences);
                            } else {
                                errors.preference = "There is no preferences";
                                return res.status(400).json(errors)
                            }
                        })
                    console.log(profile);
                }
                else {
                    console.log("Profile doesn't exists");
                }
            })
    }
);

/**
 * @api {post} api/profiles/preferences/add Add new partner preference
 * @apiName AddPartnerPreference
 * @apiGroup Profiles
 * @apiPermission Private
 * @apiParam {String} name Name to identify user partner profile preference
 * @apiParam {String} sex Partner sex - one of option from "[MALE, FEMALE, OTHER]"
 * @apiParam {String} age Partner age between two number - "{from: 20, to: 22}" (stringified)
 * @apiParam {String} location Partner location
 * @apiParam {String} motivation Partner motivation to looking for somebody - one of option "['BORED', 'FRIENDS', 'LOVE', 'JUST_CHAT', 'OTHER']"
 * @apiParam {String} maritalStatus Partner mariatal status - one of option "['SINGLE', 'DIVORCED', 'MARRIED', 'WIDOWED', 'SEPARATED', 'ENGAGED', 'HAVE_PARTNER']"
 * @apiParam {String} personality Partner personality name
 * @apiParam {String} profession Partner profession name
 * @apiParam {String} hobbies Partner hobbies name separated by comma for example "Archery, Animation"
 * @apiParam {String} precedence  Define traits precedence stringify {
    profileTraitName: {
      type: String,
    },
    precedence: {
      type: Number,
    },
    isRequired: {
      type: Boolean,
    }
  }
 */
router.post(
    '/preferences/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.body);
        const { errors, isValid } = validateProfilePreferences(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Get fields
        let profilePreferenceFields = {};

        // string fields
        if (req.body.name) profilePreferenceFields.name = req.body.name;
        if (req.body.location) profilePreferenceFields.location = req.body.location;

        // enums
        if (req.body.sex) profilePreferenceFields.sex = req.body.sex;
        if (req.body.motivation) profilePreferenceFields.motivation = req.body.motivation;
        if (req.body.maritalStatus) profilePreferenceFields.maritalStatus = req.body.maritalStatus;

        // number fields
        req.body.age = JSON.parse(req.body.age);
        if (req.body.age.from && req.body.age.to) {
            profilePreferenceFields.age = req.body.age;
        } else {
            profilePreferenceFields.age = null;
        }
        // one from list
        if (req.body.personality)
            profilePreferenceFields.personality = req.body.personality;
        else
            profilePreferenceFields.personality = "";
        if (req.body.profession) {
            profilePreferenceFields.profession = req.body.profession;
        } else {
            profilePreferenceFields.profession = "";
        }
        // array fields
        if (req.body.hobbies) {
            profilePreferenceFields.hobbies = req.body.hobbies.split(',');
            profilePreferenceFields.hobbies = profilePreferenceFields.hobbies.map(hobby => {
                return hobby.trim();
            }
            );
        } else {
            profilePreferenceFields.hobbies = [];
        }

        if (req.body.precedence) {
            profilePreferenceFields.precedence = JSON.parse(req.body.precedence);
        }
        // profilePreferenceFields = JSON.parse(JSON.stringify(profilePreferenceFields).replace(/'/g, '"'));
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {

                    // Check if profile preference exists
                    const profilePreferences = profile.partnersProfilePreference;
                    for (let profile of profilePreferences) {
                        if (profile.name === profilePreferenceFields.name) {
                            errors.name = "That name already exists";
                            return res.status(400).json(errors);
                        }
                    }

                    findAllProfileSubdocuments(profilePreferenceFields.personality, profilePreferenceFields.profession, profilePreferenceFields.hobbies)
                        .then(([personality, profession, hobbies]) => {
                            let preference = {
                                "name": profilePreferenceFields.name,
                                "location": profilePreferenceFields.location,
                                "sex": profilePreferenceFields.sex,
                                "motivation": profilePreferenceFields.motivation,
                                "maritalStatus": profilePreferenceFields.maritalStatus,
                                "age": profilePreferenceFields.age,
                                "personality": personality,
                                "profession": profession,
                                "hobbies": hobbies,
                                "precedence": profilePreferenceFields.precedence
                            }

                            Profile.findOneAndUpdate(
                                { user: req.user.id },
                                {
                                    $push: { partnersProfilePreference: preference }
                                },
                                { new: true },
                            ).then(profile => res.status(200).json(profile))
                                .catch((err) => console.log(`Error when updating: ${err}`));
                        })

                }
            });
    }
);

/**
 * @api {post} api/profiles/preferences/:name/delete Delete partner preference with name from param
 * @apiName DeletePartnerPreference
 * @apiGroup Profiles
 * @apiPermission Private
 * @apiParam {String} name Partner profile name
 */
router.post('/preferences/:name/delete',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {};
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        {
                            $pull: { partnersProfilePreference: { name: req.params.name } }
                        },
                        { new: true }
                    )
                        .then(profile => res.json(profile))
                        .catch((err) => console.log(`Error when deleting preference: ${err}`));
                }
                else {
                    errors.profile = "Profile doesn't exists";
                }
            })
    }
)

/**
 * @api {get} api/profiles/preferences/:name Request for user partner profile with specific name from param
 * @apiName GetPartnerProfile
 * @apiGroup Profiles
 * @apiPermission Private
 * @apiParam {String} name Partner profile name
 */
router.get(
    '/preferences/:name',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOne(
                        { user: req.user.id },
                        ["partnersProfilePreference", "-_id"]
                    )
                        .then(profilesPreference => {
                            const preferences = profilesPreference.partnersProfilePreference;
                            preferences.map((preference) => {
                                if (preference.name === req.params.name) {
                                    return res.json(preference);
                                }
                            })
                            errors.preference = "Preference with this name doesn't exists";
                            return res.status(400).json(errors)
                        })
                    console.log(profile);
                }
                else {
                    console.log("Profile doesn't exists");
                }
            })
    }
);

function findAllProfileSubdocuments(person, prof, hob) {
    return findPersonalityByName(person)
        .then((personality) => {
            if (personality) {
                return Promise.all([personality, findProfessionByName(prof)])
            }
            else {
                errors.personality = "This personality doesn't exist. If it is please contact with us!";
                return Promise.all([{ errors }, findProfessionByName(prof)])
            }
        })
        .then(([personality, profession]) => {
            if (profession) {
                return Promise.all([personality, profession, findHobbiesByName(hob)])
            }
            else {
                errors.profession = "This profession doesn't exist. If it is please contact with us!"
                profession = {};
                return Promise.all([personality, { errors }, findHobbiesByName(hob)])
            }
        })
        .catch((err) => console.log(`Error when preparing profilefields: ${err}`))
}

function findPersonalityByName(personality) {
    return Personality.findOne({ name: personality }, ["name", "shortcut", "role", "description", "traits", "-_id"])
        .then(personality => {
            const personalityObject = personality ? personality : {};
            return Promise.resolve(personalityObject);
        })
}

function findProfessionByName(profession) {
    return Profession.findOne({ name: profession }, ['name', 'type', '-_id'])
        .then(profession => {
            const professionObject = profession ? profession : {};
            return Promise.resolve(professionObject);
        })
}

function findHobbiesByName(hobbies) {
    return Hobby.find({
        'name': { $in: hobbies }
    }, ['name', 'type', 'effort', '-_id'], function (err, docs) {
        if (docs) {
        }
        else {
            console.log(`Error with saving hobbies: ${err}`);
        }
    });
}


module.exports = router;