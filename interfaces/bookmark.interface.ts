import { Profile } from ".";
import { LikeInterface } from "./like.interface";

export interface BookmarkInterface {
    comments: Comment[],
    content: string;
    likes: LikeInterface[];
    timestamp: string;
    userId: Profile[];
    _id: string
}