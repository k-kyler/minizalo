import { FC, useState, MouseEvent } from "react";
import "./friend-item.style.css";
import {
  Avatar,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { FriendType } from "typings/friend.type";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useAppSelector } from "redux/hooks";
import { selectUser } from "redux/user.slice";
import { selectInboxes } from "redux/inboxes.slice";

interface IFriendItem extends FriendType {}

const FriendItem: FC<IFriendItem> = ({
  senderId,
  senderData,
  receiverId,
  receiverData,
  beFriendAt,
}) => {
  const { user } = useAppSelector(selectUser);
  const { inboxes } = useAppSelector(selectInboxes);

  const history = useHistory();

  const getIntoFriendInbox = async () => {
    const inboxIdToSelect = inboxes.find(
      (inbox) =>
        inbox.type === "personal" &&
        inbox.memberIds.includes(senderId) &&
        inbox.memberIds.includes(receiverId)
    )?.inboxId;

    history.push({ pathname: "/chat", state: { inboxIdToSelect } });

    //   try {
    //     const { code, inbox } = await dispatch(
    //       postInbox({
    //         name: "",
    //         background: "",
    //         type: "personal",
    //         ownerId: "",
    //         memberIds: [senderId, receiverId],
    //       })
    //     ).unwrap();

    //     if (code === "success") {
    //       setAnchorEl(null);
    //       history.push({
    //         pathname: "/chat",
    //         state: { inboxIdToSelect: inbox.inboxId },
    //       });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  // Friend menu setup
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openFriendMenuHandler = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFriendMenuHandler = () => {
    setAnchorEl(null);
  };
  // End friend menu setup

  if (senderId !== user.userId) {
    return (
      <>
        <Grid item md={6} className="friendItem">
          <div className="friendItem__info">
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/Resources/${
                senderData.avatar
              }`}
              alt={senderData.userName}
            />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {senderData.userName}
            </Typography>
          </div>

          <div
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openFriendMenuHandler}
          >
            <IconButton className="friendItem__action">
              <MoreHorizIcon />
            </IconButton>
          </div>
        </Grid>

        {/* Friend menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={closeFriendMenuHandler}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "8px",
              mt: 0.5,
              ml: -0.1,
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
          <MenuItem onClick={getIntoFriendInbox}>
            <ListItemIcon>
              <ForwardToInboxIcon />
            </ListItemIcon>
            Send message
          </MenuItem>
        </Menu>
      </>
    );
  } else if (receiverId !== user.userId) {
    return (
      <>
        <Grid item md={6} className="friendItem">
          <div className="friendItem__info">
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/Resources/${
                receiverData.avatar
              }`}
              alt={receiverData.userName}
            />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {receiverData.userName}
            </Typography>
          </div>

          <div
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openFriendMenuHandler}
          >
            <IconButton className="friendItem__action">
              <MoreHorizIcon />
            </IconButton>
          </div>
        </Grid>

        {/* Friend menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={closeFriendMenuHandler}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "8px",
              mt: 0.5,
              ml: -0.1,
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
          <MenuItem onClick={getIntoFriendInbox}>
            <ListItemIcon>
              <ForwardToInboxIcon />
            </ListItemIcon>
            Send message
          </MenuItem>
        </Menu>
      </>
    );
  }
  return null;
};

export default FriendItem;
