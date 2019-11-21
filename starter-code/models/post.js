const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 140,
    minlength: 1
  },
  creatorId: {
    type: String,
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  },
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;