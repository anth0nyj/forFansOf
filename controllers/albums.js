// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Album = require('../models/albums.js');
const Artist = require('../models/artists.js');
const User = require('../models/users.js');

// Routes

// Read Route (Index)
router.get('', async (req, res) => {
  const albums = await Album.find();
  res.render('albums/index.ejs', {albums});
});

// Create Page
router.get('/new', async (req, res) => {
  res.render('albums/new.ejs');
});

// Create Route
router.post('/', async (req, res) => {
  const newAlbum = await Artist.create(req.body);
  res.redirect('back');
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
  res.redirect('back');
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
