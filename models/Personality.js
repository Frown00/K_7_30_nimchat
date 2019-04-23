const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TraitSchema = new Schema({ name: String });

const PersonalitySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  shortcut: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ANALYST', 'DIPLOMAT', 'SENTINEL', 'EXPLORER'],
    required: true
  },
  traits: [String],
  description: {
    type: String,
    required: true
  }
});


module.exports = Personality = mongoose.model('personalities', PersonalitySchema);


// seed collection with data
const PersonalitySeeder = require('./seeders/PersonalitySeeder');
// Personality.deleteMany({}, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted");
//   }
// });
// const seeder = new PersonalitySeeder();
// seeder.seed();