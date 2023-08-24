import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConsoleLogWriter } from "drizzle-orm";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
console.log(body)
    const { email, password } = body;

    // checking if user exist in DB
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return NextResponse.json(
        { error: `User with email ${email} doesn't registered` },
        { status: 400 }
      );
    }
    // if user is found verify the passsword
    const validUserPassword = await bcryptjs.compare(password, user.password!);
    if (!validUserPassword) {
      return NextResponse.json(
        {
          error: `Invalid credentials`,
        },
        { status: 403 }
      );
    }
    //if everything is ok proceed to create token
    const data = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const sessionToken = await jwt.sign(data, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    //setting user session cookie
    const response = NextResponse.json({message: `user successfully logged`},{status: 200});
    response.cookies.set("sessionToken", sessionToken, {
      httpOnly: true
    })
    return response;
  } catch (error: any) {
    NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
    console.log(error);
  }
};
