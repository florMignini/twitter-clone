import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";

import { getUserData } from "@/helpers/getUserData";

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    const profile = await getUserData(req);
    const googleMail: any = req.cookies.get("GoogleSessionEmail")?.value;
    const googleUserId = JSON.parse(googleMail)?._id;

      const profileInfo = await User.findOne({ _id: profile ? profile.id! :  googleUserId}).select(
        "-password"
      );
      console.log(profileInfo)
      return NextResponse.json({ profileInfo }, { status: 200 });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
