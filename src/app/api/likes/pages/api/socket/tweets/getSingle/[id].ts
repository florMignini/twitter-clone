import { connectDB } from "@/db/config";
import Tweet from "../../../../../../../../../models/tweet";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../../../../../../../types";

connectDB();
const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    const { id } = req.query
  try {
    const singleTweet = await Tweet.findOne({ _id: id })
      .select("-__v")
      .populate("userId", "-password -__v")
      .populate("likes", "-tweetId -__v ")
      .populate("comments", "-__v ");

    return res.status(200).json(singleTweet);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
