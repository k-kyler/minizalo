import { FC } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";
import { Avatar, Typography } from "@mui/material";
import { UserType } from "../../../typings/UserType";

interface IMessage extends MessageType {}

export const Message: FC<IMessage> = ({
  id,
  uid,
  username,
  avatar,
  text,
  video,
  image,
  type,
  createdAt,
}) => {
  // Test data for your logged user
  const user: UserType = {
    uid: "user1",
    username: "kkyler",
    avatar: "",
    createdAt: "Wed Oct 27, 10:00 PM",
  };
  // End of test data for your logged user

  return (
    <li className={`message ${user.uid === uid ? "message--yourUser" : ""}`}>
      {/* Avatar */}
      {user.uid === uid ? null : <Avatar alt={username} src={avatar} />}

      {/* Message content */}
      <div
        className={`message__info ${
          user.uid === uid ? "message__info--yourUser" : ""
        }`}
      >
        {/* Username */}
        {user.uid === uid ? null : (
          <Typography variant="caption" color="gray">
            {username}
          </Typography>
        )}

        {/* Display styles for each types of message */}
        {type === "text" ? (
          <Typography variant="body1" className="message__text">
            {text}
          </Typography>
        ) : type === "image" ? (
          <div className="message__image"></div>
        ) : type === "video" ? (
          <div className="message__video"></div>
        ) : null}

        {/* Timestamp */}
        <Typography variant="caption" color="gray">
          {createdAt}
        </Typography>
      </div>
    </li>
  );
};
