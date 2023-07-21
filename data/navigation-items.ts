import { navItem } from "../interfaces/navigation-items.interfaces"
import {
    AiOutlineHome, AiOutlineBell, AiOutlineUser
} from 'react-icons/ai'
import { BsBookmark, BsEnvelope } from 'react-icons/bs'
export const nav_items: navItem[] = [
    {
        icon: AiOutlineHome,
        title: "Home"
    },
    {
        icon: AiOutlineBell,
        title: "Notification"
    },
    {
        icon: BsEnvelope,
        title: "Messages"
    },
    {
        icon: BsBookmark,
        title: "Bookmarks"
    },
    {
        icon: AiOutlineUser,
        title: "Profile"
    },
]