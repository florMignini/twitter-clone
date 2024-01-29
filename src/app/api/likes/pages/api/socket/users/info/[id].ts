import { connectDB } from "@/db/config";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../../../../../../../types";
import User from "../../../../../../../../../models/user";

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
    const { id } = req.query;

    try {
        const profileInfo = await User.findOne({ _id: id }).select(
          "-password"
        );
    
        return res.status(200).json( profileInfo );
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
}

export default handler