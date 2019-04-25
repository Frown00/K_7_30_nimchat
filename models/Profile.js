const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Load models
const Hobby = require('./Hobby').schema;
const Personality = require('./Personality').schema;
const Profession = require('./Profession').schema;


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
  sex: {
    type: String,
    enum: ['FEMALE', 'MALE', 'OTHER']
  },
  location: {
    type: String
  },
  personality: {
    type: Personality,
    default: {}
  },
  profession: {
    type: Profession,
    default: {}
  },
  motivation: {
    type: String,
    enum: ['BORED', 'FRIENDS', 'LOVE', 'JUST_CHAT', 'OTHER']
  },
  hobbies: {
    type: [Hobby],
    default: []
  },
  maritalStatus: {
    type: String,
    enum: ['SINGLE', 'DIVORCED', 'MARRIED', 'WIDOWED', 'SEPARATED', 'ENGAGED', 'HAVE_PARTNER']
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