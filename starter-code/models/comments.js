const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    postId:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Comments = mongoose.model('Comments', postSchema);

module.exports = Comments;
