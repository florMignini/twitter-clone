import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Notification from "../../../../../../models/notification";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {
  try {
    const notificationsByUser = await Notification.find({
      recipient: context.params.id,
    }).select("-__v");

    return NextResponse.json(notificationsByUser, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
