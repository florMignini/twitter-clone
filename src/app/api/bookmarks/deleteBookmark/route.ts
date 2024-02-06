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
    })
    bookmarkToDelete.tweets.pull(tweetId)
    bookmarkToDelete.save()
    // tweet to delete bookmark
    const unBookedTweet = await Tweet.findById({
      _id: tweetId,
    })
    .populate("bookmarks", "-__v");
    unBookedTweet.bookmarks.pull(bookmarkToDelete._id)
    unBookedTweet.save();
    return NextResponse.json(bookmarkToDelete, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
