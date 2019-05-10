const express = require('express');
const router = express.Router();


// Load profession model
const Profession = require('../../models/Profession');

/**
 * @api {get} api/professions Request for all specified professions
 * @apiName GetProfessions
 * @apiGroup Professions
**/
router.get("/", (req, res) => {
  Profession.find({})
    .then((profession) => res.json(profession))
});


module.exports = router;
