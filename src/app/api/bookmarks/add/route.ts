import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "../../../../../models/bookmark";
import Tweet from "../../../../../models/tweet";

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
      await userBookmarks.tweets.unshift(tweetId);
      userBookmarks.save();
    }
    // create new Bookmark  
    const newBookmark = await new Bookmark({
      userId,
      tweetId,
    }).save();
    await newBookmark.tweets.unshift(tweetId);
    newBookmark.save();
    const bookedTweet = await Tweet.findOne({
      _id: tweetId,
    });

    //pushing to Tweet.likes arr the new user-tweet like
    await bookedTweet.bookmarks.unshift(tweetId);
    bookedTweet.save();

    return NextResponse.json(newBookmark, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
