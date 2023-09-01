import { connectDB } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import Tweet from "../../../../../models/tweet";

connectDB()


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        // const { username, email, password } = body;
        console.log(body)

/* 
        // create new user
        const newUser = new User({
            username,
            email,
            password: passwordHashed
        }).save()

        return NextResponse.json({message: `user ${(await newUser).username} successfully created`},{status: 201}) */




    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}