import mongoose from "mongoose";
import User from "./user";
import Like from "./like";
import Comment from "./comment";
import Bookmark from "./bookmark";
import { Tweet } from "../interfaces";

const tweetSchema:any = new mongoose.Schema(
  {
    content: { type: String },
    image: { type: String },
    userImage: { type: String },
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: Like }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }],
    bookmarks:[{ type: mongoose.Schema.Types.ObjectId, ref: Bookmark }]
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.models.Tweet<Tweet> || mongoose.model("Tweet", tweetSchema);
export default Tweet;
