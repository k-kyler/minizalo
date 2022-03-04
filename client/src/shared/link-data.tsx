import { Chat } from "pages/chat";
import { Friends } from "pages/friends";
import { Dashboard } from "pages/dashboard";
import { Copyright } from "pages/copyright";
import { Search } from "pages/search";
import { LinkType } from "typings/link.type";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";

export const linkData: LinkType[] = [
  {
    name: "Dashboard",
    Icon: <DashboardIcon />,
    pathname: "/dashboard",
    Component: <Dashboard />,
  },
  {
    name: "Search",
    Icon: <SearchIcon />,
    pathname: "/search",
    Component: <Search />,
  },
  {
    name: "Chat",
    Icon: <ForumIcon />,
    pathname: "/chat",
    Component: <Chat />,
  },
  {
    name: "Friends",
    Icon: <PeopleAltIcon />,
    pathname: "/friends",
    Component: <Friends />,
  },
  {
    name: "Copyright",
    Icon: <AssistantPhotoIcon />,
    pathname: "/copyright",
    Component: <Copyright />,
  },
];
