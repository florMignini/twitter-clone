import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userToUnfollowId, userId } = await req.json();

    const unfollower = await User.findOne({
      _id: userId,
    });

    // user validation
    if (!unfollower) {
      const error = new Error("User not found");
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    //delete collaborator
    unfollower.following.pull(userToUnfollowId);

    await unfollower.save();

    return NextResponse.json(unfollower, {
      status: 200,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
