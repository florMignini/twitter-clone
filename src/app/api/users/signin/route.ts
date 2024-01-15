import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../../../../models/user";


connectDB();

export const POST = async (req: NextRequest, response: NextResponse) => {
  try {
    const body = await req.json();
    const { name, email, password, image } = body;

    //db user session
    if (password) {
      // checking if user exist in DB
      const userRes = await User.findOne({ email });

      if (!userRes) {
        return NextResponse.json(
          { error: `User with email ${email} is not registered` },
          { status: 400 }
        );
      }
      // if user is found verify the passsword
      const validUserPassword = await bcryptjs.compare(
        password,
        userRes.password!
      );

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
        id: userRes._id,
        username: userRes.username,
        email: userRes.email,
      };
      const sessionToken = await jwt.sign(data, process.env.TOKEN_SECRET!, {
        expiresIn: "7d",
      });
      //setting user session cookie
      const response = NextResponse.json(
        { message: `user successfully logged` },
        { status: 200 }
      );
      response.cookies.set("sessionToken", sessionToken , {
        httpOnly: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });
      return response;
    }

    //google session
    // checking if user exist in DB
    const userRes = await User.findOne({ email });

    if (!userRes) {
      // create new user by Google session
      const newUser = await new User({
        username: name,
        email,
        profile_picture: image,
        isGoogleSession: true,
      }).save();
      NextResponse.json({ newUser }, { status: 201 });
      return newUser;
    }

    //if everything is ok proceed to create token
    const data = {
      id: userRes._id,
      username: userRes.username,
      email: userRes.email,
    };
    const googleSessionToken = await jwt.sign(data, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    //setting user session cookie
    const googleResponse = NextResponse.json(
      { message: `user successfully logged` },
      { status: 200 }
    );
    //setting google user session data in cookies
    googleResponse.cookies.set("googleSessionToken", googleSessionToken, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    return googleResponse;
  } catch (error: any) {
    console.log(error);
   return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
