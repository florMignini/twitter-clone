import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import { getUserData } from "@/helpers/getUserData";
import Tweet from "../../../../../models/tweet";

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    // const profile = await getUserData(req);
    // const profileInfo = await Tweet.findOne({ _id: profile.id! }).select(
    //   "-password"
    // );
    // return NextResponse.json({ profileInfo }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
 