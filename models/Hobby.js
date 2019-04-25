const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HobbySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
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
});

module.exports = Hobby = mongoose.model('hobbies', HobbySchema);


// seed collection with data
// const HobbySeeder = require('./seeders/HobbySeeder');
// Hobby.deleteMany({}, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted");
//   }
// });
// const seeder = new HobbySeeder();
// seeder.seed();