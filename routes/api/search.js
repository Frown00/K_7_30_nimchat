const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Conversation = require('../../models/Conversation');
mongoose.set('useFindAndModify', false);


/**
 * @api {post} api/search/conversation/new Create new conversation
 * @apiName Create new conversation
 * @apiGroup Search
 * @apiPermission Private
 * @apiParam {String} user1 First user id in conversation 
 * @apiParam {String} user2 Second user id in conversation
 */
router.post('/conversation/new',
  (req, res) => {
    let conversationFields = {};

    if (req.body.user1)
      conversationFields.user1 = req.body.user1;

    if (req.body.user2)
      conversationFields.user2 = req.body.user2;

    // conversation.messages = [];
    Conversation.findOne(
      {
        $or: [
          { $and: [{ user1: conversationFields.user1 }, { user2: conversationFields.user2 }] },
          { $and: [{ user1: conversationFields.user2 }, { user2: conversationFields.user1 }] }
        ]
      }
    )
      .then(conversation => {
        if (conversation) {
          console.log("jest już");
          // console.log(conversation);
          return res.status(200).json(conversation);
        }
        else {
          console.log("nie ma")
          const conv = new Conversation(conversationFields);

          conv.save((err) => {
            if (err)
              return res.status(500).json("Error while saving conversation");
            else
              return res.status(200).json(conv);
          })
        }
      })
      .catch(err => console.log(err));


    //     message.save((err) => {
    //       if (err)
    //         sendStatus(500);
    //       io.emit('message', req.body);
    //       res.status(200).json(message);
    //     })
  }
);

/**
 * @api {post} api/search/conversation/message Send message
 * @apiName Send message
 * @apiGroup Search
 * @apiPermission Private
 * @apiParam {String} userName Author name of message 
 * @apiParam {String} message Content of message
 * @apiParam {Number} conversationId Current conversation id
 */
router.post('/conversation/message',
  (req, res) => {
    let messageFields = {};
    if (req.body.userName)
      messageFields.userName = req.body.userName;

    if (req.body.message && req.body.message !== "")
      messageFields.message = req.body.message;

    // const message = new Message(messageFields);
    Conversation.findOneAndUpdate(
      { _id: req.body.conversationId },
      { $push: { messages: messageFields } },
      { new: true })
      .then((conv) => {
        // console.log(conv);
        if (conv) {
          io.emit('message', messageFields);
          res.status(200).json(messageFields);
        }
      })


  });


/**
 * @api {post} api/search/conversation/messages Get all messages from current conversation
 * @apiName Get all messages from current conversation
 * @apiGroup Search
 * @apiPermission Private
 * @apiParam {Number} conversationId Current conversation id
 */
router.post('/conversation/messages',
  (req, res) => {
    Conversation.findOne(
      { _id: req.body.conversationId }
    )
      .then(conv => {

        if (conv !== null && conv.messages !== null && conv.messages !== []) {
          res.status(200).json(conv.messages);

        }
        else {
          res.status(404).json({ noMessages: "no messages" })
        }
      })
  });


// router.post(
//   '/enqueue',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const errors = {};
//     User.findOne({ user: req.user.id })
//       .then(user => {
//         if (!user) {
//           return res.status(404).json({ error: "User does not exists" });
//         }
//         else {

//         }
//       })
//     Profile.findOne({ user: req.user.id })
//       .populate('user', ['name', 'avatar'])
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = 'Thers is no profile for this user';
//           return res.status(404).json(errors);
//         }
//         profile["age"] = profile["age"] > 0 ? profile["age"] : '';
//         //console.log(profile);
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// router.post('/enqueue',
//   (req, res) => {

//   });

module.exports = router;
