const express = require('express');
const router = express.Router();


// Load user model
const Hobby = require('../../models/Hobby');

/**
 * @api {get} api/hobbies Request for all specified hobbies
 * @apiName GetHobbies
 * @apiGroup Hobbies
**/
router.get("/", (req, res) => {
  Hobby.find({})
    .then((hobby) => res.json(hobby))
});


module.exports = router;
