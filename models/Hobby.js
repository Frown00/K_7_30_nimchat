const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HobbySchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = Hobby = mongoose.model('hobbies', HobbySchema);

// seed collection with data
const HobbySeeder = require('./seeders/HobbySeeder');
const seeder = new HobbySeeder();
// seeder.seed();