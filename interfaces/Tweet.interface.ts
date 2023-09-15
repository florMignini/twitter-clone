import { Like } from "@/app/client_components/Tweet";
import { Profile } from ".";

export interface Tweet {
  _id: string;
  content: string;
  profiles: Profile;
  likes: Like[];
  comments: Comment;
  timestamp: string;
}
