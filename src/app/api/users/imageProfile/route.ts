import { connectDB } from "@/db/config";
import Tweet from "../../../../../models/tweet";
import { unlink, writeFile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import User from "../../../../../models/user";

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export const POST = async (req: any) => {
  try {
    const data = await req.formData();
    const imageToStorage = data.get("profile-image");
    const userId = data.get("profile-id");
    if (!imageToStorage) {
      return NextResponse.json(`no image to storage`, {
        status: 400,
      });
    }
    const bytes = await imageToStorage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //keep in file system for preview
    const filePath = path.join(process.cwd(), "tmp", imageToStorage.name);
    await writeFile(filePath, buffer);
    //upload to cloudinary
    const imageUploaded = await cloudinary.uploader.upload(filePath);
    // then remove from directory
    await unlink(filePath);
    const userToAddImage = await User.findById(userId);
    userToAddImage.profile_picture = imageUploaded.secure_url;
    await userToAddImage.save();

    return NextResponse.json(
      { message: `profile picture successfully uploaded` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
