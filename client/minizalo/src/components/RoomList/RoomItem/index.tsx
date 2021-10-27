import { Avatar, Typography } from "@mui/material";
import { FC } from "react";
import { RoomItemType } from "../../../typings/RoomItemType";
import "./RoomItem.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface IRoomItem extends RoomItemType {
  selectedRoomId: string;
  clickHandler: () => void;
}

export const RoomItem: FC<IRoomItem> = ({
  id,
  name,
  background,
  messages,
  createdAt,
  selectedRoomId,
  clickHandler,
}) => {
  return (
    <div
      className={`roomItem ${selectedRoomId === id ? "roomItem--active" : ""}`}
      onClick={clickHandler}
    >
      <div className="roomItem__group">
        {/* Background */}
        <Avatar alt={name} src={background} />

        {/* Information */}
        <div className="roomItem__info">
          <Typography variant="body1">{name}</Typography>

          {/* View last message */}
          {messages?.length && messages[messages.length - 1].type === "text" ? (
            <Typography variant="caption" color="gray">
              {messages[messages.length - 1].username}:{" "}
              {messages[messages.length - 1].text}
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
      <MoreHorizIcon className="roomItem__setting" color="disabled" />
    </div>
  );
};
