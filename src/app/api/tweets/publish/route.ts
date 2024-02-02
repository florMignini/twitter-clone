
import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";


connectDB();

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export const POST = async (req: Request) => {
  try {
    
    const tweetdata = await req.json();
    // create new Twitter
    const newTweet:any = await new Tweet({
      content: tweetdata.tweetContent,
      image: tweetdata.tweetImage || "",
      userImage: tweetdata.tweetUserImage ? tweetdata.tweetUserImage : null,
      userId: tweetdata.userId,
    }).save();


    return NextResponse.json(
      newTweet,
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
