const mongoose = require('mongoose');

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
  
});

module.exports = mongoose.model("Team", TeamSchema);