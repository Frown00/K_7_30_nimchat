const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Load models - when using throw duplicate keys error
// const Hobby = require('./Hobby').schema;
// const Personality = require('./Personality').schema;
// const Profession = require('./Profession').schema;

const Personality = new Schema({
  name: {
    type: String,
  },
  shortcut: {
    type: String,
  },
  role: {
    type: String,
    enum: ['ANALYST', 'DIPLOMAT', 'SENTINEL', 'EXPLORER'],
  },
  traits: [String],
  description: {
    type: String,
  }
}, { _id: false });

const Profession = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'ENGINEERING', 'FINANCE', 'HEALTHCARE',
      'HOSPITALITY', 'TECHNOLOGY', 'TRANSPORTATION',
    ]
  }
}, { _id: false });

const Hobby = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['indoor', 'outdoor', 'collection indoor',
      'collection outdoor', 'competitive indoor', 'competitive outdoor',
      'observation indoor', 'observation outdoor', 'other']
  },
  effort: {
    type: String,
    enum: ['ACTIVE', 'PASSIVE', 'OTHER']
  }
}, { _id: false })

const Precedence = new Schema(
  {
    profileTraitName: {
      type: String,
    },
    precedence: {
      type: Number,
      default: 0
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  }, { _id: false }
)

const PartnerPreference = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  age: {
    from: {
      type: Number
    },
    to: {
      type: Number
    }
  },
  sex: {
    type: String,
    enum: ['FEMALE', 'MALE', 'OTHER']
  },
  personality: {
    type: Personality,
    default: null
  },
  profession: {
    type: Profession,
    default: null
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
  precedence: [Precedence]

}, { _id: false });


// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 80
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
    default: null
  },
  profession: {
    type: Profession,
    default: null
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
  partnersProfilePreference: {
    type: [PartnerPreference],
    default: []
  },
  bio: {
    type: String
  },
  dateUpdated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);