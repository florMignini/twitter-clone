import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Like from "../../../../../models/like";
import Tweet from "../../../../../models/tweet";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId, tweetId } = await req.json();

    // create new Like
    const newLike = await new Like({
      userId,
      tweetId,
    }).save();
    const likedTweet = await Tweet.findOne({
      _id: tweetId,
    });

    //pushing to Tweet.likes arr the new user-tweet like
    const res = await likedTweet.likes.unshift(newLike._id);
    likedTweet.save();

    return NextResponse.json(
      newLike,
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
