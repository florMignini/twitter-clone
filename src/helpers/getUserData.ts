"use server";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserData = (request: NextApiRequest) => {
  try {
    const cookieStore = cookies();

    const sessionToken = cookieStore.get("sessionToken")?.value;

    //google session
    const googleToken = cookieStore.get("googleSessionToken")?.value;

    if (sessionToken) {
      const decodedToken: any = jwt.verify(
        sessionToken,
        process.env.TOKEN_SECRET!
      );
      return decodedToken;
    }
    if (googleToken) {
      const decodedGoogleToken: any = jwt.verify(
        googleToken,
        process.env.TOKEN_SECRET!
      );

      return decodedGoogleToken;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
