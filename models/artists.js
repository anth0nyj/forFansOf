// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Artist Schema
const artistSchema = new Schema({
  name: {type: String, required: true},
  genres: [],
  from: String,
  img: String,
  forFansOf: [],
  artistURL: String
});

module.exports = mongoose.model('Artist', artistSchema);
