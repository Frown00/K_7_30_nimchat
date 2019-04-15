const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HobbySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Hobby = mongoose.model('hobbies', HobbySchema);