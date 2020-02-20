const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    /*     picPath: {
      type: String
    }, */
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    images: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Image"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
