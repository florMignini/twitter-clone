import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";
import Notification from "../../../../../models/notification";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { userToFollowId, userId } = await req.json();

    const follower = await User.findOne({
      _id: userId,
    });
    const following = await User.findOne({
      _id: userToFollowId,
    });

    const newNotification = await new Notification({
      recipient: userId,
      content: `you start to follow ${following?.username}`,
    }).save();

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
