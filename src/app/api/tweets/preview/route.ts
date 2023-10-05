import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";
import { writeFile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";
import path from "path";

connectDB();

export const POST = async (req: any) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
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

    //upload to cloudinary
    const imageUploaded = await cloudinary.uploader.upload(filePath);

    return NextResponse.json(imageUploaded, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
