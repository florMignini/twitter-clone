import { connectDB } from "@/db/config";
import Notification from "../../../../../../models/notification";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest, context: { params: any }) => {
    
    try {
        const {notificationId} = await req.json();
        
        const notificationsByUser = await Notification.find({
            recipient: context.params.id,
          }).select("-__v");
      if (!notificationsByUser) {
        const error = new Error(`user notifications not found`);
        return NextResponse.json({ msg: error.message }, {status: 404});
    }
    const notificationToUpdate = notificationsByUser.filter((notification:any)=> notification._id.toString() === notificationId)
        
    notificationToUpdate[0].seen = true ;
    const updatedProject = await notificationToUpdate[0].save();

    return NextResponse.json(updatedProject, {status: 200});
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
