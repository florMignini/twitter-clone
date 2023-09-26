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
  const userQuery = await getUserData(req);
  try {
    const { tweetContent} = await req.json();

    // create new Twitter
    const newTweet = new Tweet({
      content: tweetContent,
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
