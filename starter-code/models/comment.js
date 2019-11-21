
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 140,
        minlength: 1
    },
    authorId: {
        type: String,
    },
    imagePath: {
        type: String
    },
    imageName: {
        type: String
    },
    postId: {
        type: String,
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;