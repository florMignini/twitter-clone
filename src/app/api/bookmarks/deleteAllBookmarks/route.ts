import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Tweet from "../../../../../models/tweet";
import Bookmark from "../../../../../models/bookmark";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await req.json();

    const bookmarksToDelete = await Bookmark.findOne({
      userId,
    });
    bookmarksToDelete.tweets = [];
    bookmarksToDelete.save();
    // tweet to delete bookmark
    const unBookedTweets = await Tweet.findOne({
      userId,
    }).populate("bookmarks", "-__v");

    unBookedTweets.bookmarks = [];
    unBookedTweets.save();

    
    return NextResponse.json(bookmarksToDelete, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
