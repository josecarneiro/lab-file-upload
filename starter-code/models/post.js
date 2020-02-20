'use strict';

const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  authorId: mongoose.Schema.Types.ObjectId
    ? {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    : 'Anonymous',
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

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
  },
  children: [childSchema]
});

module.exports = mongoose.model('Post', schema);
