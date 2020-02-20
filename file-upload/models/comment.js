'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);
