import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { connectDB } from "@/db/config";
import User from "../../models/user";


connectDB();


export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await User.findOne({userId: user.id! })
    

  if (profile) {
    return profile;
  }
 // create new user
 const newUser = await new User({
    userId: user.id,
    username: user.emailAddresses[0].emailAddress.split("@")[0],
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  }).save();
 
  return newUser;
};