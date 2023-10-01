import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { TokenData } from "../../interfaces/token-data.interface";

export const getUserData = (request: NextRequest) => {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value || "";
    //google session
    const googleToken = request.cookies.get("googleSessionToken")?.value || "";

    if (sessionToken) {
      const decodedToken: any = jwt.verify(
        sessionToken,
        process.env.TOKEN_SECRET!
      );
      return decodedToken;
    }
    const decodedGoogleToken: any = jwt.verify(
      googleToken,
      process.env.TOKEN_SECRET!
    );

    return decodedGoogleToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
