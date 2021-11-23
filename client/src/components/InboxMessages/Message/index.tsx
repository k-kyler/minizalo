import { forwardRef } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";
import { Avatar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";
import { TimeAgo } from "../../TimeAgo";
import { openDialog } from "../../../redux/DialogSlice";
import { removeMessage } from "../../../redux/InboxesSlice";
import { postMessage } from "../../../redux/MessageSlice";
import axios from "axios";

interface IMessage extends MessageType {}

export const Message = forwardRef<HTMLLIElement, IMessage>(
  (
    {
      messageId,
      uid,
      username,
      avatar,
      content,
      file,
      type,
      createdAt,
      inboxRefId,
    },
    ref
  ) => {
    const { user } = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const cancelUploadFile = () =>
      dispatch(removeMessage({ messageId, inboxRefId }));

    const uploadFile = async () => {
      const formData = new FormData();

      formData.append("uid", uid);
      formData.append("username", username);
      formData.append("avatar", avatar);
      formData.append("content", "");
      formData.append("type", type);
      formData.append("inboxRefId", inboxRefId);
      formData.append("file", file);

      const dispatchResult = await dispatch(postMessage(formData)).unwrap();

      if (dispatchResult.code === "success") cancelUploadFile();
    };

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
              className={`message__image ${
                messageId?.includes("upload-preview")
                  ? "message__image--preview"
                  : ""
              }`}
              onClick={() =>
                !messageId?.includes("upload-preview") &&
                dispatch(
                  openDialog({ type: "zoom-image", imageSource: content })
                )
              }
            >
              {messageId?.includes("upload-preview") ? (
                <img src={content} loading="lazy" />
              ) : (
                <img
                  src={`${import.meta.env.VITE_API_URL}/Resources/${content}`}
                  loading="lazy"
                />
              )}
            </div>
          ) : type === "video" ? (
            <div className="message__video"></div>
          ) : null}

          {/* Timestamp */}
          <Typography variant="caption" sx={{ color: "#ababab" }}>
            <TimeAgo timestamp={createdAt ? createdAt : ""} />
          </Typography>

          {/* Preview message actions */}
          {messageId?.includes("upload-preview") && (
            <div className="message__previewActions">
              <Button color="primary" variant="text" onClick={uploadFile}>
                Upload
              </Button>
              <Button color="error" variant="text" onClick={cancelUploadFile}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </li>
    );
  }
);
