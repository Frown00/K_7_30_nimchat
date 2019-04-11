const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortcut: {
    type: String,
    required: true
  }
});

module.exports = Personality = mongoose.model('personalities', PersonalitySchema);


// seed collection with data
const PersonalitySeeder = require('./seeders/PersonalitySeeder');
const seeder = new PersonalitySeeder();
//seeder.seed();