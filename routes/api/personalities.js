const express = require('express');
const router = express.Router();


// Load user model
const Personality = require('../../models/Personality');


router.get("/", (req, res) => {
  Personality.find({})
    .then((per) => res.json(per))
});


module.exports = router;
