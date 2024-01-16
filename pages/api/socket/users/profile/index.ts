import { connectDB } from "@/db/config";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import { GetUserData } from "@/helpers/GetUserData";
import { NextApiResponseServerIo } from "../../../../../types";

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  try {
    const profile = await GetUserData(req);
    if (profile) {
        const profileInfo = await User.findOne({ _id: profile.id! }).select(
            "-password"
            );
      return res.status(200).json(profileInfo._doc);
    }
    return res.status(404).json({ msg: `something goes wrong` });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
