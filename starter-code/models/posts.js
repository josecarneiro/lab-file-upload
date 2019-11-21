const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    },
    comments: [
      {
        type: String
      }
    ],
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
