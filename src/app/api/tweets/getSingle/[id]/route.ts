import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Tweet from "../../../../../../models/tweet";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {
  // console.log(context.params.id)
  try {
    const singleTweet = await Tweet.findOne({ _id: context.params.id })
      .select("-__v")
      .populate("userId", "-password -__v")
      .populate("likes", "-tweetId -__v ")
      .populate("comments", "-__v ");

    return NextResponse.json({ singleTweet }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
