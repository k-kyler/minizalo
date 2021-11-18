import { forwardRef } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";
import { Avatar, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";
import { TimeAgo } from "../../TimeAgo";

interface IMessage extends MessageType {}

export const Message = forwardRef<HTMLLIElement, IMessage>(
  ({ messageId, uid, username, avatar, content, type, createdAt }, ref) => {
    const { user } = useAppSelector(selectUser);

    return (
      <li
        ref={ref}
        className={`message ${user.userId === uid ? "message--yourUser" : ""}`}
      >
        {/* Avatar */}
        {user.userId === uid ? null : <Avatar alt={username} src={avatar} />}

        {/* Message content */}
        <div
          className={`message__info ${
            user.userId === uid ? "message__info--yourUser" : ""
          }`}
        >
          {/* Username */}
          {user.userId === uid ? null : (
            <Typography variant="caption" color="gray">
              {username}
            </Typography>
          )}

          {/* Display styles for each types of message */}
          {type === "text" ? (
            <Typography variant="body1" className="message__text">
              {content}
            </Typography>
          ) : type === "image" ? (
            <div className="message__image"></div>
          ) : type === "video" ? (
            <div className="message__video"></div>
          ) : null}

          {/* Timestamp */}
          <Typography variant="caption" color="gray">
            <TimeAgo timestamp={createdAt ? createdAt : ""} />
          </Typography>
        </div>
      </li>
    );
  }
);
