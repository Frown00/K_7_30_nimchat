const express = require('express');
const router = express.Router();


// Load user model
const Personality = require('../../models/Personality');

/**
 * @api {get} api/personalities Request for all specified personalities
 * @apiName GetPersonalities
 * @apiGroup Personalities
**/
router.get("/", (req, res) => {
  Personality.find({})
    .then((per) => res.json(per))
});


module.exports = router;
