import mongoose from "mongoose";


const tweetBookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", tweetBookmarkSchema);

export default Bookmark;
