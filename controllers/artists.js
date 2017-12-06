// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Artist = require('../models/artists.js');
const Album = require('../models/albums.js');

// Routes
router.get('/', async (req, res) => {
  const artists = await Artist.find();
  res.render('index.ejs', {artists});
});


// Controller Export
module.exports = router;
