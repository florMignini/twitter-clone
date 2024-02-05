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
    }).populate("tweets", "-__v");
    const bookedTweet = await Tweet.findOne({
      _id: tweetId,
    }).populate("bookmarks", "-__v");

    if (userBookmarks) {
      // if it exist
      //pushing to Bookmark.tweetId arr the new bookmark-tweetId
      await userBookmarks.tweets.unshift(tweetId);
      userBookmarks.save();
      return NextResponse.json(userBookmarks, { status: 201 });
    } else {
      // create new Bookmark
      const newBookmark = await new Bookmark({
        userId,
        tweetId,
      }).save();
      await newBookmark.tweets.unshift(tweetId);
      newBookmark.save();

      //pushing to Tweet.bookmark arr the new user-tweet bookmarkId
      await bookedTweet.bookmarks.unshift(newBookmark._id);
      bookedTweet.save();

      return NextResponse.json(newBookmark, { status: 201 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
