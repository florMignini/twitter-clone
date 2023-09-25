import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Tweet from "../../../../../models/tweet";
import Bookmark from "../../../../../models/bookmark";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId, tweetId } = await req.json();

    const bookmarkToDelete = await Bookmark.findOne({
      userId,
    });
    // to unbooked id
    bookmarkToDelete.tweets.pull(tweetId);
    console.log(bookmarkToDelete)
    bookmarkToDelete.save();

    return NextResponse.json(
      { message: `bookmark successfully deleted` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
