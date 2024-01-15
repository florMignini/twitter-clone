import { NextApiRequest } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const getUserData = (request: NextApiRequest) => {


    try {

      const sessionToken = request?.cookies?.get("sessionToken")?.value;
      //google session
      const googleToken = request?.cookies?.get("googleSessionToken")?.value;

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
