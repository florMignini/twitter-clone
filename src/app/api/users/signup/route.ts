import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connectDB()


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { username, email, password } = body;


        // checking if user is already in db
        const alreadyExist = await User.findOne({ email })
        if (alreadyExist) {
            return NextResponse.json({ error: `user with email ${email} already exist` },
                { status: 400 })
        }

        //   if the user is not in db
        // hash password
        const salt = await bcryptjs.genSalt(10)
        const passwordHashed = await bcryptjs.hash(password, salt)

        // create new user
        const newUser = new User({
            username,
            email,
            password: passwordHashed
        }).save()

        return NextResponse.json({message: `user ${(await newUser).username} successfully created`},{status: 201})




    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}