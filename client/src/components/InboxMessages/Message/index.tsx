import { forwardRef, useState, useRef, useEffect } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";
import { TimeAgo } from "../../TimeAgo";
import Emoji from "react-emoji-render";
import { Avatar, Typography, Button } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";
import { openDialog } from "../../../redux/DialogSlice";
import { changeIsPreviewing, removeMessage } from "../../../redux/InboxesSlice";

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

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [uploadErrorMessage, setUploadErrorMessage] = useState("");

    const videoControllerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);

    // Video handlers
    const videoDurationHandler = () => {
      if (videoRef.current) {
        videoRef.current.addEventListener("timeupdate", () => {
          if (videoRef.current && videoProgressRef.current) {
            let progress =
              videoRef.current.currentTime / videoRef.current.duration;

            videoProgressRef.current.style.width = progress * 100 + "%";

            if (videoRef.current.ended && videoControllerRef.current) {
              setIsVideoPlaying(false);

              videoControllerRef.current.style.transform = "translateY(100%)";
              videoControllerRef.current.style.transition =
                "all 0.3s ease-in-out";
            }
          }
        });
      }
    };

    const playVideoHandler = () => {
      setIsVideoPlaying(true);

      if (videoRef.current && videoControllerRef.current) {
        videoControllerRef.current.style.transform = "translateY(0)";
        videoControllerRef.current.style.transition = "all 0.3s ease-in-out";
        videoRef.current.play();
        videoDurationHandler();
      }
    };

    const pauseVideoHandler = () => {
      setIsVideoPlaying(false);

      if (videoRef.current && videoControllerRef.current) {
        videoControllerRef.current.style.transform = "translateY(100%)";
        videoControllerRef.current.style.transition = "all 0.3s ease-in-out";
        videoRef.current.pause();
      }
    };

    const videoFullscreenHandler = () => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
      }
    };

    const videoMutedHandler = () => {
      setIsVideoMuted(!isVideoMuted);

      if (videoRef.current) {
        videoRef.current.muted = isVideoMuted;
      }
    };
    // End of video handlers

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

    if (type === "time-message")
      return (
        <div className="timeMessage">
          <Typography variant="caption">
            {createdAt
              ? new Date(createdAt).toDateString() +
                ", " +
                new Date(createdAt).toLocaleTimeString()
              : ""}
          </Typography>
        </div>
      );
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
            <div
              className={`message__video ${
                messageId?.includes("upload-preview")
                  ? "message__video--preview"
                  : ""
              }`}
            >
              {messageId?.includes("upload-preview") ? (
                <>
                  {/* Video */}
                  <video src={content}></video>

                  {/* Video overlay */}
                  {!isVideoPlaying ? (
                    <div
                      className="message__videoOverlay"
                      onClick={playVideoHandler}
                    >
                      <div className="message__videoPlayButton">
                        <PlayCircleOutlineIcon sx={{ fontSize: "4.5rem" }} />
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {/* Video */}
                  <video
                    ref={videoRef}
                    src={`${import.meta.env.VITE_API_URL}/Resources/${content}`}
                  ></video>

                  {/* Video overlay */}
                  {!isVideoPlaying ? (
                    <div
                      className="message__videoOverlay"
                      onClick={playVideoHandler}
                    >
                      <div className="message__videoPlayButton">
                        <PlayCircleOutlineIcon sx={{ fontSize: "4.5rem" }} />
                      </div>
                    </div>
                  ) : null}

                  {/* Video controller */}
                  <div
                    className="message__videoController"
                    ref={videoControllerRef}
                  >
                    <div className="message__videoButtons">
                      <span
                        className="message__videoButton"
                        onClick={pauseVideoHandler}
                      >
                        <PauseIcon fontSize="small" />
                      </span>

                      <div className="message__videoProgress">
                        <div ref={videoProgressRef}></div>
                      </div>

                      <span
                        className="message__videoButton"
                        onClick={videoMutedHandler}
                      >
                        {!isVideoMuted ? (
                          <VolumeUpIcon fontSize="small" />
                        ) : (
                          <VolumeOffIcon fontSize="small" />
                        )}
                      </span>

                      <span
                        className="message__videoButton"
                        onClick={videoFullscreenHandler}
                      >
                        <AspectRatioIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
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
