import { Like } from "@/app/client_components/Tweet";
import { BookmarkInterface, Profile } from ".";

export interface Tweet {
  _id?: string;
  content: string;
  image?: string;
  userImage?: string;
  userId: Profile;
  likes: Like[];
  bookmarks: BookmarkInterface[];
  comments: Comment;
  timestamp: string;
  views: Profile[];
}
