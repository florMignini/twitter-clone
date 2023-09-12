import mongoose from "mongoose";
/* import User from "./user";
import Tweet from "./tweet"; */

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  timestamp: { type: Date, default: Date.now },
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
