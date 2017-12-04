// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

// Routes

// Login Page
router.get('/login', (req, res) => {
  res.render('user/login.ejs', {
    message: req.session.message
  });
});

// Login Post
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.username = req.body.username;
      req.session.logged = true;
      console.log((req.session, req.body));
      // res.render('user/show.ejs', {
      //   user: req.session
      // });
      res.redirect('/user/' + req.session.username);
    } else {
      console.log('bad password');
      req.session.message = "Username/password combination is invalid";
      res.redirect('/user/login');
    }
  } catch (err) {
    console.log(err.message);
    req.session.message = "Username/password combination is invalid";
    res.redirect('/user/login');
  }
});

// Register Post
router.post('/register', async (req, res, next) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const username = req.body.username;
  const userDbEntry = {};
  userDbEntry.username = username;
  userDbEntry.password = passwordHash;
  // console.log(userDbEntry);
  try {
    const user = await User.create(userDbEntry);
    console.log(user);
    req.session.username = user.username;
    req.session.logged = true;
    // res.render('/user/show.ejs', {
    //   user: req.sessions
    // });
    res.redirect('/user/' + req.session.username);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.redirect('/user/login');
});

router.get('/:id', async (req, res) => {
  res.render('user/show.ejs', {
    user: req.session
  });
})

// // Read Route (Show)
// router.get('/:id', async (req, res) => {
//   const onePhoto = await Photo.findById(req.params.id);
//   const comments = await Comment.find({photo: onePhoto._id});
//   // res.send({onePhoto, comments});
//   res.render('photos/show.ejs', {onePhoto, comments});
// });

// Controller Export
module.exports = router;
