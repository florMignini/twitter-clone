import mongoose from "mongoose";


const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
