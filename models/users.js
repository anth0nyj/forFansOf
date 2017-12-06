const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  followedBands: []
});

module.exports = mongoose.model('User', usersSchema);
