import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import Bookmark from "../../../../../models/bookmark";

connectDB();

export const GET = async (req: NextRequest) => {
  try {

    const allBookmarks = await Bookmark.find({})
      .select("-__v")
      .populate("userId", "-password -__v")
      .populate("tweets", "-__v ");

    return NextResponse.json({ allBookmarks }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
