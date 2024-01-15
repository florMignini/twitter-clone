import { NextApiRequest } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const getUserData = (request: NextApiRequest) => {
 console.log(request)
    try {
      const cookies = parse(request.headers.cookie || "");
      console.log("cookies: ",cookies)
      const sessionToken = cookies.sessionToken!;
      //google session
      const googleToken = cookies.googleSessionToken!;

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
