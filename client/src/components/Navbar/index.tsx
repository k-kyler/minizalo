import { FC, useState, MouseEvent } from "react";
import {
  Avatar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser, signOutUser } from "../../redux/UserSlice";
import { linkData } from "../../constants/LinkData";

export const Navbar: FC = () => {
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

  const { user } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const signOutHandler = async () => {
    setAnchorEl(null);
    dispatch(signOutUser());
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <Link to="/">
          <img src={Logo} alt="MiniZalo" />
          <Typography variant="h5">MiniZalo</Typography>
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar__links">
        {linkData.map((link, index) => (
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
        {/* Short information */}
        <Tooltip title={user.userName}>
          <div className="navbar__userInfo">
            <Avatar
              sx={{
                width: "2rem",
                height: "2rem",
                marginRight: "0.5rem",
              }}
              alt={user.userName}
              src={user.avatar}
            />
            <Typography
              variant="body1"
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflowX: "hidden",
                maxWidth: "7em",
              }}
            >
              {user.userName}
            </Typography>
          </div>
        </Tooltip>

        {/* Notifications */}
        <IconButton className="navbar__settingButton">
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Setting */}
        <div
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={openUserSettingMenuHandler}
        >
          <IconButton className="navbar__settingButton">
            <ArrowDropDownIcon />
          </IconButton>
        </div>
      </div>

      {/* Setting menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeUserSettingMenuHandler}
        className="navbar__userSettingMenu"
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 3,
            ml: 0.4,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
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

        <MenuItem onClick={signOutHandler}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};
