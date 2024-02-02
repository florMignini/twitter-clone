import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Like from "../../../../../models/like";
import Tweet from "../../../../../models/tweet";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId, tweetId } = await req.json();

    const likeToDelete = await Like.findOneAndDelete({
      userId,
      tweetId,
    }).exec();
    // to unlike id
    let likeToDeleteId = likeToDelete._id;

    // tweet to delete like
    const unLikedTweet = await Tweet.findById({
      _id: tweetId,
    })
    .populate("userId", "-__v")
    .populate("likes", "-tweetId -__v ");
    unLikedTweet.likes.pull(likeToDeleteId);
    unLikedTweet.save();

    return NextResponse.json(unLikedTweet._doc, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
