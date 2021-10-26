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
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openUserSettingMenu = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserSettingMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link className="navbar__logo" to="/">
        <img src={Logo} alt="MiniZalo" />
        <Typography variant="h5">MiniZalo</Typography>
      </Link>

      {/* Links */}
      <ul className="navbar__links">
        <Tooltip title="Home">
          <li className="navbar__link navbar__link--active">
            <HomeIcon />
          </li>
        </Tooltip>

        <Tooltip title="Chat">
          <li className="navbar__link">
            <ForumIcon />
          </li>
        </Tooltip>

        <Tooltip title="Notifications">
          <li className="navbar__link">
            <NotificationsIcon />
          </li>
        </Tooltip>

        <Tooltip title="Friends">
          <li className="navbar__link">
            <PeopleAltIcon />
          </li>
        </Tooltip>
      </ul>

      {/* User setting */}
      <div className="navbar__userSetting">
        <Tooltip title="kkyler">
          <div
            className="navbar__userInfo"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openUserSettingMenu}
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
        onClose={closeUserSettingMenu}
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
        <MenuItem onClick={closeUserSettingMenu}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={closeUserSettingMenu}>
          <ListItemIcon>
            <Brightness7Icon />
          </ListItemIcon>
          Light theme
        </MenuItem>
        <Divider />
        <MenuItem onClick={closeUserSettingMenu}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};
