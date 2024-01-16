import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";

import { getUserData } from "@/helpers/GetUserData";
import Comment from "../../../../../models/comment";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { commentContent, commentImage, userId, tweetId } = await req.json();

    // create new Comment
    const newComment = await new Comment({
      content: commentContent,
      image: commentImage || null,
      userId,
      tweetId,
    }).save();

    const commentTweet = await Tweet.findOne({
        _id: tweetId,
      });
      //pushing to Tweet.comments arr the new user-tweet comment
      const res = await commentTweet.comments.unshift(newComment._id);
      commentTweet.save();
    return NextResponse.json(
      { message: `comment successfully created` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
