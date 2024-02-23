import { connectDB } from "@/db/config";
import User from "../../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest, context: { params: any }) => {
    
    try {
        const {tweetContentData} = await req.json();
        
    const singleProject = await User.findOne({ _id: context.params.id }).select(
        "-password"
      );
      if (!singleProject) {
        const error = new Error(`Project not found`);
        return NextResponse.json({ msg: error.message }, {status: 404});
    }
    singleProject.username = tweetContentData.username || singleProject.username;
    singleProject.email = tweetContentData.email || singleProject.email;
    singleProject.bio = tweetContentData.bio || singleProject.bio;
    singleProject.location = tweetContentData.location || singleProject.location;
    singleProject.imageUrl = tweetContentData.imageUrl || singleProject.imageUrl;
    singleProject.coverImg = tweetContentData.coverImg || singleProject.coverImg;
    const updatedProject = await singleProject.save();

    return NextResponse.json(updatedProject, {status: 200});
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
