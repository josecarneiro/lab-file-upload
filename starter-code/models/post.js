const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
        type: String,
        required: true,
        trim: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    picPath: {
        type: String
    },
    picName: {
        type: String
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
