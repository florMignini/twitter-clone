"use server"
import { NextApiResponseServerIo } from "../../../../types";

import Tweet from "../../../../models/tweet";
import { connectDB } from "@/db/config";

import { GetUserData } from "@/helpers/GetUserData";
import { NextApiRequest } from "next";

connectDB();

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

 const handler = async(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
  ) => {
  try {
    const userQuery = await GetUserData(req);
    const tweetdata = await req.body;

    if (!userQuery) {
      return res.status(401).json({ error: `Unauthorized` });
    }

    if (!tweetdata) {
        return res.status(401).json({ error: `Tweet data missing` });
      }
    // create new Twitter
    const newTweet = await new Tweet({
      content: tweetdata.tweetContent,
      image: tweetdata.tweetImage || "",
      userImage: tweetdata.tweetUserImage ? tweetdata.tweetUserImage : null,
      userId: userQuery.id,
    }).save();

    //socket connection
    res?.socket?.server?.io?.on("new tweet", (tweet)=>{
    console.log("new", tweet)
    })
     
    return res.status(200).json(newTweet)
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler