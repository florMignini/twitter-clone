import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: any) => {
  try {
    const data = await req.formData();

    console.log(data);

    return NextResponse.json({ message: `image uploaded` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
