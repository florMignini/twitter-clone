import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Comment from "../../../../../../models/comment";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {

  try {

    const allComments = await Comment.find({ tweetId: context.params.id }).select("-__v");
    console.log(allComments)
    return NextResponse.json({message: `todo marcha bien Milhouse`},{ status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
