import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { TokenData } from "../../interfaces/token-data.interface";


export const getUserData = (request: NextRequest) => {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value || "";
    //google session
    const googleToken = request.cookies.get("next-auth.session-token")?.value;
    if (sessionToken) {
      const decodedToken: any = jwt.verify(
        sessionToken,
        process.env.TOKEN_SECRET!
        );
        return decodedToken;
      }

  } catch (error: any) {
    throw new Error(error.message);
  }
};
