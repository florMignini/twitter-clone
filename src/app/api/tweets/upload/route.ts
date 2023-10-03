import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";
import { writeFile } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import path from "path";

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
    const bytes = await imageToStorage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //keep in file system for preview
    const filePath = path.join(process.cwd(), "preview", imageToStorage.name);
    await writeFile(filePath, buffer);
    return NextResponse.json(filePath, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
