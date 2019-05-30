const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const _ = require('lodash');
const proxy = require('http-proxy-middleware');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const personalities = require('./routes/api/personalities');
const hobbies = require('./routes/api/hobbies');
const professions = require('./routes/api/professions');
const search = require('./routes/api/search');


const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello!'));

// Use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/personalities', personalities);
app.use('/api/hobbies', hobbies);
app.use('/api/professions', professions);
app.use('/api/search', search);


// SOCKET.IO
const http = require('http');
const server = http.createServer(app);
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
let match = {};
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

    socket.on('enqueue', (user) => {
        socket.user = user.user.id;
        if (isInQueue(usersInQueue, socket.user)) {
            console.log("Już jest w kolejce");
        }
        else {
            user.socketId = socket.id;
            if (usersInQueue !== undefined && usersInQueue !== null)
                usersInQueue.push(user);
        }

        // console.log(usersInQueue);
        if (usersInQueue !== undefined && usersInQueue !== null) {
            for (let i = 0; i < usersInQueue.length; i++) {
                if (!isSame(user.user, usersInQueue[i].user)) {
                    if (isMatch(user, usersInQueue[i])) {
                        socket.emit('partner_found', usersInQueue[i]);
                        removeUserFromQueue(usersInQueue, usersInQueue[i].user.id);
                        break;
                    }
                }
            }
        }


        socket.on('send_info_to_partner', (data) => {
            io.of('queue').to(data[1].socketId).emit('response_partner', data[0]);
            // remove partner - data[0] contains partner info
            // console.log(data[0].user);
            removeUserFromQueue(usersInQueue, data[0].user.id);

        });

        io.of('queue').emit('get_users_count', usersInQueue.length);

    })

    socket.on('dequeue', (user) => {
        // console.log(user);
        removeUserFromQueue(usersInQueue, user.id);
        console.log("Anulowaol");
        // console.log(usersInQueue);

    })



})

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
    if (user1.profile !== null && user2.profile !== null) {
        if (user1.profile.sex === user2.profile.sex) {
            return true;
        }
    }

    return false;
}



/// END SOCKET

port = process.env.PORT || 5000;

if (!module.parent) {
    server.listen(port, () => console.log(`Server runnning on port ${port}!`));
}


module.exports = server;
