const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  message: String,
  userName: String,
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const ConversationSchema = new Schema({
  user1: String,
  user2: String,
  messages: [Message]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = Conversation = mongoose.model('conversations', ConversationSchema);