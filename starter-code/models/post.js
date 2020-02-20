'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    content: {
      type: String
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
  },
  {
    //timestamps: true => like this it will give the standard mongoose names for the dates
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);



module.exports = mongoose.model('Post', schema);
