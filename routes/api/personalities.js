const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


const Personality = require("../../models/Personality");


// @route   GET api/profile/test
// @dest    Test profile route
// @access  Public
router.get('/test',
  (req, res) => res.json(
    {
      msg: "Profile works"
    })
);

