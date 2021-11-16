import { Avatar, Typography } from "@mui/material";
import { FC } from "react";
import { InboxItemType } from "../../../typings/InboxItemType";
import "./InboxItem.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface IInboxItem extends InboxItemType {
  selectedInboxId: string;
  clickHandler: () => void;
}

export const InboxItem: FC<IInboxItem> = ({
  inboxId,
  name,
  background,
  createdAt,
  selectedInboxId,
  clickHandler,
}) => {
  return (
    <div
      className={`inboxItem ${
        selectedInboxId === inboxId ? "inboxItem--active" : ""
      }`}
      onClick={clickHandler}
    >
      <div className="inboxItem__group">
        {/* Background */}
        <Avatar alt={name} src={background} />

        {/* Information */}
        <div className="inboxItem__info">
          <Typography variant="body1">{name}</Typography>

          {/* View last message */}
          {/* {messages?.length && messages[messages.length - 1].type === "text" ? (
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
          )} */}

          {/* Test */}
          <Typography variant="caption" color="gray">
            No messages
          </Typography>
          {/* End of test */}
        </div>
      </div>

      {/* Room setting */}
      <MoreHorizIcon className="inboxItem__setting" color="disabled" />
    </div>
  );
};
