import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";

import { getUserData } from "@/helpers/getUserData";
import { getSession } from "next-auth/react"

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    const profile = await getUserData(req);
    if (profile) {
      const profileInfo = await User.findOne({ _id: profile.id! }).select(
        "-password"
      );
      return NextResponse.json({ profileInfo }, { status: 200 });
    }
    return NextResponse.json(
      { message: `third party session` },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
