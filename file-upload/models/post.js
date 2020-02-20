'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  picPath: {
    type: String
  },
  picName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
