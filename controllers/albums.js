// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Album = require('../models/albums.js');
const Artist = require('../models/artists.js');
const User = require('../models/users.js');

// Middleware
router.use(express.static('public'));
mongoose.Promise = global.Promise;

// Routes

// // Read Route (Index)
// router.get('', async (req, res) => {
//   const albums = await Album.find();
//   const artists = await Artist.find();
//   res.render('albums/index.ejs', {albums, artists});
// });

// Create Page
router.get('/new', async (req, res) => {
  const albums = await Album.find();
  const artists = await Artist.find();
  res.render('albums/new.ejs', {albums, artists});
});

// Create Route
router.post('/', async (req, res) => {
  const albums = await Album.find();
  const artists = await Artist.find();
  const artistToAssign = await Artist.findOne({name: req.body.artist});
  req.body.artist = artistToAssign._id;
  req.body.forFansOf = req.body.forFansOf.split(', ');
  req.body.genres = req.body.genres.split(', ');
  req.body.tracks = req.body.tracks.split(', ');
  const newURL = req.body.title.toLowerCase().replace(/ /g,"_");
  const newAlbum = await Album.create(req.body);
  await Album.update(
    {title: req.body.title, artist: artistToAssign._id},
    {
      $set: {
        albumURL: newURL
      }
    }
  );
  res.redirect('artists/' + artistToAssign.artistURL);
});

// Update Page
router.get('/:album/edit', async (req, res) => {
  try {
    const albumToEdit = await Album.find({name: req.params.album});
    res.render('albums/edit.ejs', {
      album: albumToEdit
    });
  } catch (err) {
    res.send(err.message);
  }
});

// Update Route
router.put('/:album', async (req, res) => {
  const albumToUpdate = await Album.update(
    {title: req.params.album},
    {
      $set: {
        title: req.body.title,
        img: req.body.img,
        year: req.body.year,
        forFansOf: req.body.forFansOf,
        tracks: req.body.tracks,
        artist: req.body.artist
      }
    }
  );
  res.redirect('./' + req.params.album);
});

// Delete Route
router.delete('/:album', async (req, res) => {
  const albumToDelete = await Album.find({title: req.params.album});
  await Album.findByIdAndRemove(albumToDelete._id);
  res.redirect('albums');
});

// Read Route (Show)
router.get('/:album', async (req, res) => {
  const albumToShow = await Album.find({title: req.params.album});
  res.render('albums/show.ejs', {
    album: albumToShow
  });
});


// Controller Export
module.exports = router;
