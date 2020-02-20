'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: 'Autor'
    },
    imagePath: {
      type: String
    },
    imageName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', commentSchema);
