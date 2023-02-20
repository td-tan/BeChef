const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
});

UserSchema.methods.hashPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('Hex');

  this.hash = crypto.scryptSync(password+process.env.SECRET_KEY, this.salt, 64).toString('hex');
}

UserSchema.methods.verifyPassword = function(password) {
  const hash = crypto.scryptSync(password+process.env.SECRET_KEY, this.salt, 64).toString('hex');
  return this.hash === hash;
}

module.exports = mongoose.model("User", UserSchema);