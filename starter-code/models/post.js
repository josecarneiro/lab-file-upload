const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
      trim: true
    },

    picture: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
