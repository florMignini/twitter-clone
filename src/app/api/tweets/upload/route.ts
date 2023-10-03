import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: any) => {
  try {
    const data = await req.formData();
    const imageToStorage = data.get("tweet-image");
    if (!imageToStorage) {
      return NextResponse.json(`no image to storage`, {
        status: 400,
      });
    }

    return NextResponse.json({ message: `image uploaded` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
