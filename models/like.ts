import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet", required: true },
  timestamp: { type: Date, default: Date.now },
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
