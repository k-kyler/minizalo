import { FC, useState, MouseEvent } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import {
  Avatar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavbarLinkType } from "../../typings/NavbarLinkType";

export const Navbar: FC = () => {
  // Navbar link setup
  const navbarLinkList: NavbarLinkType[] = [
    {
      name: "Home",
      Icon: <HomeIcon />,
      pathname: "/",
    },
    {
      name: "Search",
      Icon: <SearchIcon />,
      pathname: "/search",
    },
    {
      name: "Chat",
      Icon: <ForumIcon />,
      pathname: "/chat",
    },
    {
      name: "Notifications",
      Icon: <NotificationsIcon />,
      pathname: "/notifications",
    },
    {
      name: "Friends",
      Icon: <PeopleAltIcon />,
      pathname: "/friends",
    },
  ];
  // End of navbar link setup

  // User setting menu setup
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openUserSettingMenuHandler = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserSettingMenuHandler = () => {
    setAnchorEl(null);
  };
  // End of user setting menu setup

  return (
    <div className="navbar">
      {/* Logo */}
      <Link className="navbar__logo" to="/">
        <img src={Logo} alt="MiniZalo" />
        <Typography variant="h5">MiniZalo</Typography>
      </Link>

      {/* Links */}
      <ul className="navbar__links">
        {navbarLinkList.map((link, index) => (
          <Tooltip title={link.name} key={index}>
            <NavLink
              exact
              to={link.pathname}
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              <li>{link.Icon}</li>
            </NavLink>
          </Tooltip>
        ))}
      </ul>

      {/* User setting */}
      <div className="navbar__userSetting">
        <Tooltip title="kkyler">
          <div
            className="navbar__userInfo"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openUserSettingMenuHandler}
          >
            <Avatar
              sx={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
              alt="kkyler"
              src={"https://avatars.githubusercontent.com/u/66368949?v=4"}
            />
            <Typography variant="body1">kkyler</Typography>
          </div>
        </Tooltip>
      </div>

      {/* User setting menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeUserSettingMenuHandler}
        className="navbar__userSettingMenu"
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 2,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              zIndex: 0,
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              transform: "translateY(-50%) rotate(45deg)",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
            },
          },
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={closeUserSettingMenuHandler}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={closeUserSettingMenuHandler}>
          <ListItemIcon>
            <Brightness7Icon />
          </ListItemIcon>
          Light theme
        </MenuItem>
        <Divider />
        <MenuItem onClick={closeUserSettingMenuHandler}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};
