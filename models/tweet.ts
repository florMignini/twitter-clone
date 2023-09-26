import mongoose from "mongoose";
import User from "./user";
import Like from "./like";
import Comment from "./comment";


const tweetSchema = new mongoose.Schema({
content: { type: String, required: true },
image: { type: String },
views: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: Like }],
comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }],
timestamp: { type: Date, default: Date.now },
});


const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
export default Tweet;
