const _ = require('lodash');
const isEmpty = require('../validation/isEmpty');

module.exports = function (server) {
  return {
    run: () => {
      // SOCKET.IO
      global.io = require('socket.io').listen(server);

      io.on('connection', (socket) => {
        // console.log("user connected");
        // io.emit('message', 'Wyslano');

        socket.on('disconnect', function () {
          // console.log('User disconnected');
        });

      });

      const queue = io.of('/queue');
      let userCount = 0;
      let usersInQueue = [];

      queue.on('connection', (socket) => {
        console.log('someone connected');
        socket.on('disconnect', () => {
          console.log(socket.user);
          console.log('someone disconnect');
          // usersInQueue = _.remove(usersInQueue, (u) => {
          //     return u.user.id === user.id;
          // })
          if (socket.user !== undefined || socket.user !== null) {
            removeUserFromQueue(usersInQueue, socket.user);
          }
        });

        socket.on('enqueue', ({ user, profile, preferencePartner }) => {
          let searchingProfile = preferencePartner;
          socket.user = user.id;
          if (isInQueue(usersInQueue, socket.user)) {
            console.log("Już jest w kolejce");
          }
          else {
            user.socketId = socket.id;
            if (usersInQueue !== undefined && usersInQueue !== null)
              usersInQueue.push({ user: user, profile: profile, searchingProfile });
          }

          // console.log(usersInQueue);
          if (usersInQueue !== undefined && usersInQueue !== null) {
            for (let i = 0; i < usersInQueue.length; i++) {
              if (!isSame(user, usersInQueue[i].user)) {
                if (isMatch({ profile, searchingProfile }, { profile: usersInQueue[i].profile, searchingProfile: usersInQueue[i].searchingProfile })) {
                  socket.emit('partner_found', { user: usersInQueue[i].user, profile: usersInQueue[i].profile });
                  removeUserFromQueue(usersInQueue, usersInQueue[i].user.id);
                  break;
                }
              }
            }
          }
          socket.on('send_info_to_partner', ([user, partner]) => {
            console.log(partner);
            io.of('queue').to(partner.user.socketId).emit('response_partner', user);
            // remove partner - data[0] contains partner info
            // console.log(data[0].user);
            removeUserFromQueue(usersInQueue, user.user.id);

          });

          io.of('queue').emit('get_users_count', usersInQueue.length);

        })

        socket.on('dequeue', (user) => {
          removeUserFromQueue(usersInQueue, socket.user);
          console.log("Anulowal");
          // console.log(usersInQueue);
          io.of('queue').emit('get_users_count', usersInQueue.length);

        })

      })
    }
  }
}


function removeUserFromQueue(usersInQueue, userId) {
  if (userId) {
    usersInQueue = _.remove(usersInQueue, (u) => {
      return u.user.id === userId;
    })
    if (usersInQueue === undefined) {
      usersInQueue = []
      return usersInQueue;
    }

    return usersInQueue;
  }

}

function isInQueue(usersInQueue, user) {
  if (user) {
    let usersInQueueIds = _.map(usersInQueue, 'user.id');
    // console.log(usersInQueueIds);
    let userId = user.id;
    return _.includes(usersInQueueIds, userId);
  }
  return true;
}

function isSame(user1, user2) {

  let id1 = user1.id;
  let id2 = user2.id;
  return id1 === id2;
}

function isMatch(user1, user2) {
  const profile1 = user1.profile;
  let searchingProfile1 = user1.searchingProfile;
  const profile2 = user2.profile;
  let searchingProfile2 = user2.searchingProfile;

  if (searchingProfile1 === undefined) {
    searchingProfile1 = '';
  }


  if (searchingProfile2 === undefined) {
    searchingProfile2 = '';
  }

  if (profile1 !== null && profile2 !== null && profile1 !== undefined && profile2 !== undefined) {
    const checkIfMatched = [
      isAgeMatched(profile1.age, searchingProfile1.age, profile2.age, searchingProfile2.age),
      isSexMatched(profile1.sex, searchingProfile1.sex, profile2.sex, searchingProfile2.sex),
      isPersonalityMatched(profile1.personality, searchingProfile1.personality, profile2.personality, searchingProfile2.personality),
      isLocationMatched(profile1.location, searchingProfile1.location, profile2.location, searchingProfile2.location),
      isProfessionMatched(profile1.profession, searchingProfile1.profession, profile2.profession, searchingProfile2.profession),

    ];

    const isMatched = !(checkIfMatched.includes(false));
    console.log(isMatched)
    return isMatched;


  }

  // if (user1.profile !== null && user2.profile !== null) {
  //     if (user1.profile.sex === user2.profile.sex) {
  //         return true;
  //     }
  // }

  return false;
}

function isAgeInRange(age, from, to) {
  return age >= from && age <= to
}

function isAgeMatched(age1, prefAgeRange1, age2, prefAgeRange2) {

  if (isEmpty(prefAgeRange2) || isAgeInRange(age1, prefAgeRange2.from, prefAgeRange2.to)) {
    if (isEmpty(prefAgeRange1) || isAgeInRange(age2, prefAgeRange1.from, prefAgeRange1.to)) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

function isSexMatched(sex1, prefSex1, sex2, prefSex2) {
  if (isEmpty(prefSex2) || sex1 === prefSex2) {
    if (isEmpty(prefSex1) || sex2 === prefSex1) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

function isPersonalityMatched(personality1, prefPersonality1, personality2, prefPersonality2) {
  if (personality1 === undefined)
    personality1 = '';
  if (personality2 === undefined)
    personality2 = '';
  if (prefPersonality1 === undefined)
    prefPersonality1 = '';
  if (prefPersonality2 === undefined)
    prefPersonality2 = '';

  if (isEmpty(prefPersonality2.name) || personality1.name === prefPersonality2.name) {
    if (isEmpty(prefPersonality1.name) || personality2.name === prefPersonality1.name) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

function isLocationMatched(location1, prefLocation1, location2, prefLocation2) {
  if (isEmpty(prefLocation2) || location1 === prefLocation2) {
    if (isEmpty(prefLocation1) || location2 === prefLocation1) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

function isProfessionMatched(profession1, prefProfession1, profession2, prefProfession2) {
  if (profession1 === undefined)
    profession1 = '';
  if (profession2 === undefined)
    profession2 = '';
  if (prefProfession1 === undefined)
    prefProfession1 = '';
  if (prefProfession2 === undefined)
    prefProfession2 = '';

  if (isEmpty(prefProfession2.name) || profession1.name === prefProfession2.name) {
    if (isEmpty(prefProfession1.name) || profession2.name === prefProfession1.name) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}