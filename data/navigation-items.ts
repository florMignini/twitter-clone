import { navItem } from "../interfaces/navigation-items.interfaces";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BsBookmark, BsEnvelope } from "react-icons/bs";
export const nav_items: navItem[] = [
  {
    icon: AiOutlineHome,
    title: "Home",
  },
  {
    icon: AiOutlineBell,
    title: "Notification",
  },
  {
    icon: BsEnvelope,
    title: "Messages",
  },
  {
    icon: BsBookmark,
    title: "Bookmarks",
  },
  {
    icon: BiSolidUser,
    title: "Profile",
  },
];
