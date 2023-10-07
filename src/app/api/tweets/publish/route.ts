import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";

import { getUserData } from "@/helpers/getUserData";

connectDB();

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export const POST = async (req: NextRequest) => {
  try {
    const userQuery = await getUserData(req);

    const tweetdata = await req.json();

    // create new Twitter
    const newTweet = new Tweet({
      content: tweetdata.tweetContent,
      image: tweetdata.tweetImage || "",
      userImage: tweetdata.tweetUserImage ? tweetdata.tweetUserImage : null,
      userId: userQuery.id,
    }).save();

    return NextResponse.json(
      { message: `tweet successfully created` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
