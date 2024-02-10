import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Like from "../../../../../models/like";
import Tweet from "../../../../../models/tweet";
import { Tweet as tweetType } from "../../../../../interfaces";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId, tweetId } = await req.json();

    const tweetToAddView = await Tweet.findOne({
       _id: tweetId
    })

    if(tweetToAddView.views.includes(userId))return
    await tweetToAddView.views.unshift(userId);
    tweetToAddView.save();

    return NextResponse.json(
      { message: `viewed successfully` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
