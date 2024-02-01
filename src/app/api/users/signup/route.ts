import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";


connectDB();

export const GET = async (req: NextRequest) => {
  try {
    
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }
    
    const profile = await User.findOne({userId: user.id! })
  
    if (profile) {
      return NextResponse.json(
        profile,
        { status: 201 }
      );
    }
   // create new user
   const newUser = await new User({
      userId: user.id,
      username: user.emailAddresses[0].emailAddress.split("@")[0],
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    }).save();
   
   
    return NextResponse.json(
      newUser,
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
