import { connectDB } from "@/db/config";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
    const { public_id } = await req.json();
    const previewDeleted = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ previewDeleted } /* ok */, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
