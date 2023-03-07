const mongoose = require('mongoose');
const crypto = require('crypto');

const TeamSchema = mongoose.Schema({
  name: {
      type: String,
      unique: true,
      required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  invite_code: {
    type: String,
    required: true,
    default: crypto.randomBytes(16).toString('Hex'),
  }
});

module.exports = mongoose.model("Team", TeamSchema);