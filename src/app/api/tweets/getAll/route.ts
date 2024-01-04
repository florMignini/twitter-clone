import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import Tweet from "../../../../../models/tweet";

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    // const profile = await getUserData(req);
    const allTweets = await Tweet.find({}).sort({timestamp:'ascending'})
      .select("-__v")
      .populate("userId", "-password -__v")
      .populate("likes", "-tweetId -__v ");
    return NextResponse.json({ allTweets }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
