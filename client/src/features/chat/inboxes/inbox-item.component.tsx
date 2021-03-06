import { FC, MouseEvent } from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { InboxItemType } from "typings/inbox-item.type";
import "./inbox-item.style.css";
import { useAppSelector } from "redux/hooks";
import { selectUser } from "redux/user.slice";
import { TimeAgo } from "features/ui";

interface IInboxItem extends InboxItemType {
  selectedInboxId: string;
  clickHandler: () => void;
}

const InboxItem: FC<IInboxItem> = ({
  inboxId,
  name,
  background,
  createdAt,
  type,
  ownerId,
  messages,
  users,
  selectedInboxId,
  clickHandler,
}) => {
  const { user } = useAppSelector(selectUser);

  const openRoomSettingsMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Popup custom menu here...
  };

  return (
    <div
      className={`inboxItem ${
        selectedInboxId === inboxId ? "inboxItem--active" : ""
      }`}
      onClick={clickHandler}
    >
      <div className="inboxItem__group">
        {/* Background (Avatar) of group or personal */}
        {type === "group" ? (
          <Avatar
            src={`${import.meta.env.VITE_API_URL}/Resources/${background}`}
            alt={name}
          />
        ) : (
          <>
            {users && users.length ? (
              <>
                {user.userId === users[0].userId ? (
                  <Avatar
                    src={`${import.meta.env.VITE_API_URL}/Resources/${
                      users[1].avatar
                    }`}
                    alt={users[1].userName}
                  />
                ) : (
                  <Avatar
                    src={`${import.meta.env.VITE_API_URL}/Resources/${
                      users[0].avatar
                    }`}
                    alt={users[0].userName}
                  />
                )}
              </>
            ) : null}
          </>
        )}

        {/* Information of group or personal */}
        <div className="inboxItem__info">
          {type === "group" ? (
            <Typography variant="body1">{name}</Typography>
          ) : (
            <>
              {users && users.length ? (
                <>
                  {user.userId === users[0].userId ? (
                    <Typography variant="body1">{users[1].userName}</Typography>
                  ) : (
                    <Typography variant="body1">{users[0].userName}</Typography>
                  )}
                </>
              ) : null}
            </>
          )}

          {/* View last message */}
          {messages?.length && messages[messages.length - 1].type === "text" ? (
            <Typography variant="caption" color="gray">
              {messages[messages.length - 1].username}:{" "}
              {messages[messages.length - 1].content}
            </Typography>
          ) : messages?.length &&
            messages[messages.length - 1].type === "video" ? (
            <Typography variant="caption" color="gray">
              {messages[messages.length - 1].username}: Sent a video
            </Typography>
          ) : messages?.length &&
            messages[messages.length - 1].type === "image" ? (
            <Typography variant="caption" color="gray">
              {messages[messages.length - 1].username}: Sent an image
            </Typography>
          ) : messages?.length &&
            messages[messages.length - 1].type === "document" ? (
            <Typography variant="caption" color="gray">
              {messages[messages.length - 1].username}: Sent a document
            </Typography>
          ) : (
            <Typography variant="caption" color="gray">
              No messages
            </Typography>
          )}
        </div>
      </div>

      {/* Last active & room setting */}
      <Tooltip title="Open settings (Right click)">
        <div
          onContextMenu={openRoomSettingsMenu}
          className="inboxItem__lastActiveAndRoomSetting"
        >
          <Typography variant="caption" sx={{ color: "#ababab" }}>
            <TimeAgo
              timestamp={
                messages?.length && messages[messages.length - 1].createdAt
                  ? (messages[messages.length - 1].createdAt as any)
                  : ""
              }
            />
          </Typography>

          <MoreHorizIcon
            className="inboxItem__setting"
            color="disabled"
            fontSize="small"
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default InboxItem;
