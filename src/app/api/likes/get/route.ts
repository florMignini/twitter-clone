import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Like from "../../../../../models/like";

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    const allLikes = await Like.find({}).select("-__v");
    return NextResponse.json({ allLikes }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
