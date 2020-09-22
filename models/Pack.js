const mongoose = require('mongoose');

const { Schema } = mongoose;
// eslint-disable-next-line max-len
// TODO Change Black card Schema to have positions rather than spaces (can get length by positions array.length)
const blackCardSchema = new Schema({
  spaces: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const whiteCardSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const packSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  whiteCards: {
    type: [whiteCardSchema],
    required: true,
  },
  blackCards: {
    type: [blackCardSchema],
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

module.exports = {
  Pack: mongoose.model('packs', packSchema),
};
