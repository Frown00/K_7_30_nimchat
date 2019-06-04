const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["LOGGED_IN", "LOGGED_OUT", "IN_QUEUE", "CHATTING"],
        default: "LOGGED_OUT"
    }
});

module.exports = User = mongoose.model('users', UserSchema);