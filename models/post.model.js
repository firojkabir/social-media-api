const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
	content: String,
	date: Date
});

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    likes: {
      type: Array,
      default: [],
    },
	comments: [Comments],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
