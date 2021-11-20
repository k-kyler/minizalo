import { Avatar, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FC } from "react";
import { InboxItemType } from "../../../typings/InboxItemType";
import "./InboxItem.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";

interface IInboxItem extends InboxItemType {
  selectedInboxId: string;
  clickHandler: () => void;
}

export const InboxItem: FC<IInboxItem> = ({
  inboxId,
  name,
  background,
  createdAt,
  type,
  messages,
  users,
  selectedInboxId,
  clickHandler,
}) => {
  const { user } = useAppSelector(selectUser);

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
          <Avatar alt={name} src={background} />
        ) : (
          <>
            {users && users.length ? (
              <>
                {user.userId === users[0].userId ? (
                  <Avatar alt={name} src={users[1].avatar} />
                ) : (
                  <Avatar alt={name} src={users[0].avatar} />
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
          ) : (
            <Typography variant="caption" color="gray">
              No messages
            </Typography>
          )}
        </div>
      </div>

      {/* Room setting */}
      <MoreHorizIcon className="inboxItem__setting" color="disabled" />
    </div>
  );
};
