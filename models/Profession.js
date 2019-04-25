const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: [
      'ENGINEERING', 'FINANCE', 'HEALTHCARE',
      'HOSPITALITY', 'TECHNOLOGY', 'TRANSPORTATION',
    ]
  }
});

module.exports = Profession = mongoose.model('professions', ProfessionSchema);

// seed collection with data
// const ProfessionSeeder = require('./seeders/ProfessionSeeder');
// Profession.deleteMany({}, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted");
//   }
// });
// const seeder = new ProfessionSeeder();
// seeder.seed();