const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');

router.get('/messages',
  (req, res) => {
    Message.find({}, (err, messages) => {
      res.json(messages);
    })
  }
);

router.post('/message',
  (req, res) => {

    const messageFields = {};

    if (req.body.name)
      messageFields.name = req.body.name;

    if (req.body.message)
      messageFields.message = req.body.message;

    const message = new Message(messageFields);
    message.save((err) => {
      if (err)
        sendStatus(500);
      // io.emit('message', req.body);
      res.status(200).json(message);
    })
  }


);

module.exports = router;
