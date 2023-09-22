import mongoose from "mongoose";
import Tweet from "./tweet";
import User from "./user";

const tweetBookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tweet,
      required: true,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", tweetBookmarkSchema);

export default Bookmark;
