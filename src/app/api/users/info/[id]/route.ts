import { connectDB } from "@/db/config";
import User from "../../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {
  try {
    const profileInfo = await User.findOne({ _id: context.params.id }).select(
      "-password"
    );

    return NextResponse.json({ profileInfo }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
