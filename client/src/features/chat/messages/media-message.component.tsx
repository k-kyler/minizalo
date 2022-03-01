import { FC, useRef, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { openDialog } from "@redux/dialog.slice";
import { useAppDispatch } from "@redux/hooks";

interface IMediaMessage {
  type: "video" | "image";
  messageId?: string;
  content: string;
}

const MediaMessage: FC<IMediaMessage> = ({ type, messageId, content }) => {
  const dispatch = useAppDispatch();

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

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

  if (type === "image")
    return (
      <div
        className={`message__image ${
          messageId?.includes("upload-preview") ? "message__image--preview" : ""
        }`}
        onClick={() =>
          !messageId?.includes("upload-preview") &&
          dispatch(openDialog({ type: "zoom-image", imageSource: content }))
        }
      >
        {messageId?.includes("upload-preview") ? (
          <img src={content} />
        ) : (
          <img src={`${import.meta.env.VITE_API_URL}/Resources/${content}`} />
        )}
      </div>
    );
  return (
    <div
      className={`message__video ${
        messageId?.includes("upload-preview") ? "message__video--preview" : ""
      }`}
    >
      {messageId?.includes("upload-preview") ? (
        <>
          {/* Video */}
          <video src={content}></video>

          {/* Video overlay */}
          {!isVideoPlaying ? (
            <div className="message__videoOverlay" onClick={playVideoHandler}>
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
            <div className="message__videoOverlay" onClick={playVideoHandler}>
              <div className="message__videoPlayButton">
                <PlayCircleOutlineIcon sx={{ fontSize: "4.5rem" }} />
              </div>
            </div>
          ) : null}

          {/* Video controller */}
          <div className="message__videoController" ref={videoControllerRef}>
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
  );
};

export default MediaMessage;
