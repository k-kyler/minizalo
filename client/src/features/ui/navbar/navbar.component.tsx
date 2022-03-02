import { FC, useState, MouseEvent } from "react";
import { Link, NavLink } from "react-router-dom";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./navbar.style.css";
import Logo from "@assets/logo.png";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser, signOutUser } from "@redux/user.slice";
import { linkData } from "@shared/link-data";
import { NotificationList } from "@features/notifications";

export const Navbar: FC = () => {
  const { user } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openNotifications = Boolean(anchorElNotifications);

  const openUserSettingMenuHandler = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openNotificationsMenuHandler = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const closeUserSettingMenuHandler = () => {
    setAnchorEl(null);
  };

  const closeNotificationsMenuHandler = () => {
    setAnchorElNotifications(null);
  };

  const signOutHandler = () => {
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
              src={
                user.avatar
                  ? `${import.meta.env.VITE_API_URL}/Resources/${user.avatar}`
                  : ""
              }
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
        <Tooltip title="Notifications">
          <div
            aria-haspopup="true"
            aria-expanded={openNotifications ? "true" : undefined}
            onClick={openNotificationsMenuHandler}
          >
            <IconButton className="navbar__notificationsButton">
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </Tooltip>

        {/* Setting */}
        <Tooltip title="Setting">
          <div
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openUserSettingMenuHandler}
          >
            <IconButton className="navbar__settingButton">
              <ArrowDropDownIcon />
            </IconButton>
          </div>
        </Tooltip>
      </div>

      {/* Setting menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeUserSettingMenuHandler}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "8px",
            mt: 3,
            ml: 0,
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
              right: 15,
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
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem>
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

      {/* Notifications menu */}
      <Menu
        anchorEl={anchorElNotifications}
        open={openNotifications}
        onClose={closeNotificationsMenuHandler}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "8px",
            mt: 3,
            ml: 0,
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
              right: 15,
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
        <NotificationList />
      </Menu>
    </div>
  );
};
