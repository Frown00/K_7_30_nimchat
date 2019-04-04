const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Load models
const Hobby = require('./Hobby');
const Personality = require('./Personality');


// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  age: {
    type: Number,
  },
  location: {
    type: String
  },
  personality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personalities'
  },
  profession: {
    type: String
  },
  motivation: {
    type: String
  },
  hobbies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hobbies'
  }],
  status: {
    type: String
  },
  bio: {
    type: String
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);