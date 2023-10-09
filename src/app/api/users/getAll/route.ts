import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import User from "../../../../../models/user";

connectDB();

export const GET = async (req: NextRequest) => {
  try {
    // const profile = await getUserData(req);
    const allUsers = await User.find({}).select("-password -__v");
    // .populate("following", "-username -is_verify -created_at -email -__v ");
    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
