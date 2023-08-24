import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;