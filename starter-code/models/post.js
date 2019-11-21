const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 1
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    picPath: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Image'
      }
    ],
    picName: {
        type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
