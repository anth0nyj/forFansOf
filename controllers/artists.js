// Dependencies
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

// Models
const Artist = require('../models/artists.js');
const Album = require('../models/albums.js');
const User = require('../models/users.js');

// Middleware
router.use(methodOverride('_method'));
router.use(express.static('public'));

// Routes

// Read Route (Index)
router.get('/', async (req, res) => {
  const artists = await Artist.find();
  res.render('artists/index.ejs', {artists});
});

// Create Page
router.get('/new', (req, res) => {
  res.render('artists/new.ejs')
});

// Create Route
router.post('/', async (req, res) => {
  req.body.genres = req.body.genres.split(',');
  req.body.forFansOf = req.body.forFansOf.split(',')
  const newURL = req.body.name.toLowerCase().replace(/ /g,"_");
  const newArtist = await Artist.create(req.body);
  await Artist.update(
    {name: req.body.name},
    {
      $set: {
        artistURL: newURL
      }
    }
  );
  res.redirect('artists/' + newURL);
});

// Update Page
router.get('/:artist/edit', async (req, res) => {
  try {
    const artistToEdit = await Artist.findOne({artistURL: req.params.artist});
    res.render('artists/edit.ejs', {
    artist: artistToEdit
    });
  } catch (err) {
    res.send(err.message);
  }
});

// Update Route
router.put('/:artist', async (req, res) => {
  req.body.genres = req.body.genres.split(',');
  req.body.forFansOf = req.body.forFansOf.split(',')
  const artistToEdit = await Artist.update(
    {artistURL: req.params.artist},
    {
      $set: {
        name: req.body.name,
        genres: req.body.genres,
        from: req.body.from,
        img: req.body.img,
        forFansOf: req.body.forFansOf
      }
    }
  );
  res.redirect('back');
});

// Delete Route (Cascading)
router.delete('/:artist', async (req, res) => {
  const artistToDelete = await Artist.find({name: req.params.name});
  const albumsToDelete = await Album.find({artist: artistToDelete._id});
  await Artist.findByIdAndRemove(artistToDelete._id);
  await Album.remove({artist: albumsToDelete.artist});
  res.redirect('artists');
});

// Read Route (Show)
router.get('/:url', async (req, res) => {
  const artistToShow = await Artist.findOne({artistURL: req.params.url});
  const albumsToShow = await Album.find({artist: artistToShow._id});
  console.log(artistToShow);
  res.render('artists/show.ejs', {
    artist: artistToShow,
    albums: albumsToShow
  });
});


// Controller Export
module.exports = router;
