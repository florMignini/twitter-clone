import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  timestamp: { type: Date, default: Date.now },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
