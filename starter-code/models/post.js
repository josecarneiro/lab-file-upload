'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  }
});

module.exports = mongoose.model('Post', schema);
