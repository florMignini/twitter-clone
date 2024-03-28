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
        const error = new Error(`Project not found`);
        return NextResponse.json({ msg: error.message }, {status: 404});
    }
    const notificationToUpdate = notificationsByUser.filter((notification:any)=> {
        if(notification._id === notificationId){
            return notification;
        }
    })
    
    console.log(notificationToUpdate)
    /* 
    singleProject.coverImg = tweetContentData.coverImg || singleProject.coverImg;
    const updatedProject = await singleProject.save();

    return NextResponse.json(updatedProject, {status: 200}); */
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
