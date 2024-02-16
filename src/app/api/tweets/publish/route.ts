
import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";


connectDB();


export const POST = async (req: Request) => {
  const userData = await currentUser()

  try {
    
    const tweetdata = await req.json();
    // create new Twitter
    const newTweet = await new Tweet({
      content: tweetdata.tweetContent,
      image: tweetdata.tweetImage || "",
      userImage: tweetdata.tweetUserImage ? tweetdata.tweetUserImage : null,
      userId: tweetdata.userId,
    }).save()

    return NextResponse.json(
      newTweet,
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
