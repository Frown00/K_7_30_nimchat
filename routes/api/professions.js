const express = require('express');
const router = express.Router();


// Load profession model
const Profession = require('../../models/Profession');


router.get("/", (req, res) => {
  Profession.find({})
    .then((profession) => res.json(profession))
});


module.exports = router;
