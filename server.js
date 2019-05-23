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
        console.log('User disconnected');
    });

    socket.on('example_message', function (msg) {
        console.log('message: ' + msg);
    });

    socket.join('queue');

});


const queue = io.of('/queue');
let userCount = 0;
let usersInQueue = [];
let match = {};
queue.on('connection', function (socket) {

    console.log('someone connected');
    socket.on('disconnect', function () {
        console.log('someone disconnect');
        usersInQueue = _.remove(usersInQueue, (u) => {
            return u.user.id === user.id;
        })
    });

    socket.emit('get_users_count', usersInQueue.length);

    socket.on('enqueue', function (user) {

        console.log(usersInQueue);

        if (isInQueue(usersInQueue, user)) {
            console.log("Już jest w kolejce");
        }
        else {
            usersInQueue.push(user);
        }
        for (let i = 0; i < usersInQueue.length; i++) {
            if (!isSame(user.user, usersInQueue[i].user)) {
                if (isMatch(user, usersInQueue[i])) {
                    socket.emit('partner_found', usersInQueue[i]);
                }
            }
        }


    })

    socket.on('dequeue', function (user) {
        // console.log(user);
        usersInQueue = _.remove(usersInQueue, (u) => {
            return u.user.id === user.id;
        })
        // console.log(usersInQueue);
    })



})

function isInQueue(usersInQueue, user) {
    let usersInQueueIds = _.map(usersInQueue, 'user.user.id');
    let userId = user.id;
    return _.includes(usersInQueueIds, userId);
}

function isSame(user1, user2) {

    let id1 = user1.id;
    let id2 = user2.id;
    return id1 === id2;
}

function isMatch(user1, user2) {
    if (user1.profile.sex === user2.profile.sex) {
        return true;
    }
    return false;
}



/// END SOCKET

port = process.env.PORT || 5000;

if (!module.parent) {
    server.listen(port, () => console.log(`Server runnning on port ${port}!`));
}


module.exports = server;
