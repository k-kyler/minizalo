import { forwardRef, useState, useEffect, lazy, Suspense } from "react";
import "./message.style.css";
import Emoji from "react-emoji-render";
import { Avatar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { changeIsPreviewing, removeMessage } from "@redux/inboxes.slice";
import { MessageType } from "@typings/message.type";
import { TimeAgo } from "@features/ui/time-ago/time-ago.component";
import { TimeMessage } from "./time-message.component";
import { FallbackMessage } from "./fallback-message.component";

const MediaMessage = lazy(() => import("./media-message.component"));

interface IMessage extends MessageType {}

export const Message = forwardRef<HTMLLIElement, IMessage>(
  (
    {
      messageId,
      uid,
      username,
      avatar,
      content,
      type,
      createdAt,
      inboxRefId,
      file,
    },
    ref
  ) => {
    const { user } = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const [uploadErrorMessage, setUploadErrorMessage] = useState("");

    // File handlers
    const cancelUploadFile = () =>
      dispatch(removeMessage({ messageId, inboxRefId }));

    const uploadFile = () => dispatch(changeIsPreviewing(true));

    const uploadFileChecker = () => {
      if (file) {
        setUploadErrorMessage("");

        const lastIndexOfDot = file.name.lastIndexOf(".");
        const fileExtension = file.name.slice(lastIndexOfDot, file.name.length);

        if (
          [
            ".mp4",
            ".png",
            ".jpg",
            ".jpeg",
            ".pdf",
            ".doc",
            ".docx",
            ".xls",
            ".xlsx",
            ".txt",
            ".zip",
            ".rar",
          ].includes(fileExtension)
        ) {
          if (file.size > 10000000) {
            setUploadErrorMessage("Can't upload over 10mb");
          }
        } else {
          setUploadErrorMessage("File is not supported");
        }
      }
    };

    useEffect(() => {
      uploadFileChecker();
    }, [file]);
    // End of file handlers

    if (type === "time-message") return <TimeMessage createdAt={createdAt} />;
    return (
      <li
        ref={ref}
        className={`message ${user.userId === uid ? "message--yourUser" : ""}`}
      >
        {/* Avatar */}
        {user.userId === uid ? null : (
          <Avatar
            alt={username}
            src={`${import.meta.env.VITE_API_URL}/Resources/${avatar}`}
          />
        )}

        {/* Message content */}
        <div
          className={`message__info ${
            user.userId === uid ? "message__info--yourUser" : ""
          } ${
            type === "image" || type === "video" ? "message__info--media" : ""
          }`}
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
              <Emoji text={content} />
            </Typography>
          ) : type === "image" ? (
            <Suspense fallback={<FallbackMessage />}>
              <MediaMessage
                messageId={messageId}
                content={content}
                type={type}
              />
            </Suspense>
          ) : type === "video" ? (
            <Suspense fallback={<FallbackMessage />}>
              <MediaMessage
                messageId={messageId}
                content={content}
                type={type}
              />
            </Suspense>
          ) : type === "document" ? (
            <div
              className={`message__document ${
                messageId?.includes("upload-preview")
                  ? "message__document--preview"
                  : ""
              }`}
            >
              {messageId?.includes("upload-preview") ? (
                <Typography variant="body1">
                  <a href="#">{content}</a>
                </Typography>
              ) : (
                <Typography variant="body1">
                  <a
                    href={`${
                      import.meta.env.VITE_API_URL
                    }/Resources/${content}`}
                    download
                    target="__blank"
                  >
                    {content.split("-")[0] + "." + content.split(".")[1]}
                  </a>
                </Typography>
              )}
            </div>
          ) : null}

          {/* Timestamp */}
          <Typography variant="caption" sx={{ color: "#ababab" }}>
            <TimeAgo timestamp={createdAt ? createdAt : ""} />
          </Typography>

          {/* Preview message actions */}
          {messageId?.includes("upload-preview") && (
            <div className="message__previewActions">
              <div className="message__previewActionButtons">
                <Button
                  disabled={uploadErrorMessage ? true : false}
                  color="primary"
                  variant="text"
                  onClick={uploadFile}
                >
                  Upload
                </Button>
                <Button color="error" variant="text" onClick={cancelUploadFile}>
                  Cancel
                </Button>
              </div>

              {uploadErrorMessage ? (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ p: 0.5, mr: 1 }}
                >
                  {uploadErrorMessage}
                </Typography>
              ) : null}
            </div>
          )}
        </div>
      </li>
    );
  }
);
