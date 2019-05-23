const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');

router.get('/messages',
  (req, res) => {
    Message.find({}).sort({ 'created_at': 'desc' }).exec((err, messages) => {
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
      io.emit('message', req.body);
      res.status(200).json(message);
    })
  }


);

router.post(
  '/enqueue',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.findOne({ user: req.user.id })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User does not exists" });
        }
        else {

        }
      })
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'Thers is no profile for this user';
          return res.status(404).json(errors);
        }
        profile["age"] = profile["age"] > 0 ? profile["age"] : '';
        //console.log(profile);
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post('/enqueue',
  (req, res) => {

  });

module.exports = router;
