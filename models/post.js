const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    pictureUrl: {
      type: String
    },
    pictureName: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updatedDate'
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
