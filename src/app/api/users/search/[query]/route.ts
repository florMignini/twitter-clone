import { connectDB } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../../models/user";

connectDB();

export const GET = async (req: NextRequest, context: { params: any }) => {

  try {
      const querySearch = await User.find({
        "$or":[
            {username:{$regex:context.params.query}},
            {email:{$regex:context.params.query}}
        ]
       })
      .select("-__v -password")
      return NextResponse.json({ querySearch }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
