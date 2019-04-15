const express = require('express');
const router = express.Router();


// Load user model
const Hobby = require('../../models/Hobby');


router.get("/", (req, res) => {
  Hobby.find({})
    .then((hobby) => res.json(hobby))
});


module.exports = router;
