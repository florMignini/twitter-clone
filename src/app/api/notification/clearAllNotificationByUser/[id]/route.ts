import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import Notification from "../../../../../../models/notification";

connectDB();

export const POST = async (req: NextRequest, context: { params: any }) => {
  try {
    await Notification.deleteMany({
      recipient: context.params.id,
    });

    return NextResponse.json({ msg: `notifications deleted` }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
