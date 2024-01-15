import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import { getUserData } from "@/helpers/getUserData";

connectDB();

export async function GET (req: NextApiRequest, res:NextResponse)  {
  try {
    const profile = await getUserData(req);
    console.log("profile: ", profile)

   if(profile){
    const profileInfo = await User.findOne({ _id: profile.id! }).select(
      "-password"
      );
      return NextResponse.json({ profileInfo }, { status: 200 });
  }
return NextResponse.json({msg: `something goes wrong`})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

