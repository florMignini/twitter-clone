import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";


connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { followId, userId } = await req.json();

    const follower = await User.findOne({
      _id: userId,
    });
    //pushing to User.following arr the new user id
    await follower.following.push(followId);
    follower.save();

    return NextResponse.json(
      { message: `following successfully` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
