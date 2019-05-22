const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String,
  message: String,
}, { timestamps: { createdAt: 'created_at' } })

module.exports = Message = mongoose.model('messages', MessageSchema);
