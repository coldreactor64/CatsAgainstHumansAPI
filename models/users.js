const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wonGames: {
    type: Array,
    required: true,
  },
  lostGames: {
    type: Array,
    required: true,
  },
  activeGame: {
    type: String,
    required: false,
  },

});

module.exports = mongoose.model('users', userSchema);
