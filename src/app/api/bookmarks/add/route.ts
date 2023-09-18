import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "../../../../../models/bookmark";

import { getUserData } from "@/helpers/getUserData";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userId, tweetId } = await req.json();
    // first find the user bookmarks if it already exist
    const userBookmarks = await Bookmark.findOne({
        userId,
    });
    
    if (userBookmarks) {
      // if it exist
      //pushing to Bookmark.tweetId arr the new bookmark-tweetId
      const res = await userBookmarks.tweets.unshift(tweetId);
      userBookmarks.save();
    } else {
      // create new Bookmark
      const newBookmark = new Bookmark({
        userId,
        tweetId,
      }).save();
    }

    return NextResponse.json(
      { message: `bookmark successfully added` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
