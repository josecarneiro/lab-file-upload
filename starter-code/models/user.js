const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: false
    },
    picture: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
