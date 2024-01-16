"use server";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import {parse} from "cookie"


export const GetUserData = (request: any) => {
  // console.log(parse(request.headers.cookie).sessionToken)
  try {

    const sessionToken = parse(request.headers.cookie).sessionToken;

    //google session
    const googleToken = parse(request.headers.cookie).googleSessionToken;

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
