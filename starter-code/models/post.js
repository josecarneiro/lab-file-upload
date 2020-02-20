'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);

