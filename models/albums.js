// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const albumSchema = new Schema({
  title: {type: String, required: true},
  img: String,
  year: Number,
  genres: [],
  forFansOf: [],
  tracks: [],
  artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}
});

// Export
module.exports = mongoose.model('Album', albumSchema);
