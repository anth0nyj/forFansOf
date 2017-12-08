const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('pretty-error').start();

// Database - Connect
const mongoURI = processs.env.MONGODB_URI || 'mongodb://localhost:27017/forFansOf';
mongoose.connect(mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Database - Test
const db = mongoose.connection;
db.on = ('error', () => console.log(err.message));
db.on = ('connected', () => console.log('Mongo running: ', mongoURI));
db.on = ('disconnected', () => console.log('Mongo disconnected'));

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: "wortesindgutwennworkefolgen",
  resave: false,
  saveUninitialized: false
}));

// Controllers
// Controllers Dependencies
const albumsController = require('./controllers/albums.js');
const artistsController = require('./controllers/artists.js');
const sessionsController = require('./controllers/session.js');
// Controller Middleware
app.use('/albums', albumsController);
app.use('/artists', artistsController);
app.use('/', sessionsController);

// Root Redirect
app.get('/', (req, res) => {
    if (req.session.logged) {
      res.redirect('user/' + req.session.username);
    } else {
      res.redirect('artists');
    }
});


// Config
const PORT = 3002;
// Listen
app.listen(PORT, () => {
  console.log('=============================');
  console.log('Server app on port: ', PORT);
  console.log('=============================');
});
