import { forwardRef } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";
import { Avatar, ButtonGroup, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";
import { TimeAgo } from "../../TimeAgo";
import { openDialog } from "../../../redux/DialogSlice";
import { selectInboxes } from "../../../redux/InboxesSlice";

interface IMessage extends MessageType {}

export const Message = forwardRef<HTMLLIElement, IMessage>(
  ({ messageId, uid, username, avatar, content, type, createdAt }, ref) => {
    const { user } = useAppSelector(selectUser);
    const { isPreviewing } = useAppSelector(selectInboxes);

    const dispatch = useAppDispatch();

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
          } ${type !== "text" ? "message__info--media" : ""}`}
        >
          {/* Username */}
          {user.userId === uid ? null : (
            <Typography
              variant="caption"
              sx={{ color: "#808080", fontWeight: 500 }}
            >
              {username}
            </Typography>
          )}

          {/* Display styles for each types of message */}
          {type === "text" ? (
            <Typography variant="body1" className="message__text">
              {content}
            </Typography>
          ) : type === "image" ? (
            <div
              className="message__image"
              onClick={() =>
                dispatch(
                  openDialog({ type: "zoom-image", imageSource: content })
                )
              }
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/Resources/${content}`}
                loading="lazy"
              />
            </div>
          ) : type === "video" ? (
            <div className="message__video"></div>
          ) : null}

          {/* Timestamp */}
          <Typography variant="caption" sx={{ color: "#ababab" }}>
            <TimeAgo timestamp={createdAt ? createdAt : ""} />
          </Typography>

          {/* Preview message actions */}
          {isPreviewing && messageId === "upload-preview" && (
            <ButtonGroup variant="text">
              <Button color="success">Upload</Button>
              <Button color="error">Cancel</Button>
            </ButtonGroup>
          )}
        </div>
      </li>
    );
  }
);
