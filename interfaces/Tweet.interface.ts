import { Like } from "@/app/client_components/Tweet";
import { Profile } from ".";

export interface Tweet {
  _id: string;
  content: string;
  image?: string;
  userImage?: string;
  userId: Profile;
  likes: Like[];
  comments: Comment;
  timestamp: string;
  views: Profile[];
}
