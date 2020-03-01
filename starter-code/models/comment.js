'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

module.exports = mongoose.model('Comment', schema);
