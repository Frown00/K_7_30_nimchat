const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


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

const http = require('http');
const server = http.createServer(app);
global.io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log("user connected");
    // io.emit('message', 'Wyslano');

    socket.on('disconnect', function () {
        console.log('User disconnected');
    });

    socket.on('example_message', function (msg) {
        console.log('message: ' + msg);
    });
});



port = process.env.PORT || 5000;

if (!module.parent) {
    server.listen(port, () => console.log(`Server runnning on port ${port}!`));
}


module.exports = server;
