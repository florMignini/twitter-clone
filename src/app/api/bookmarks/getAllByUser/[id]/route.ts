import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import Bookmark from "../../../../../../models/bookmark";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {
  try {
    
    const bookmarkByUser = await Bookmark.find({ userId: context.params.id })
      .select("-__v")
      // .populate("userId", "-password -__v")
      .populate({
        path: "tweets",
        select: "-__v",
        populate: {
          path: "userId",
          select: "-password -__v"
        }
      })
    return NextResponse.json({ bookmarkByUser }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
