import { FC, useRef, useState, KeyboardEvent } from "react";
import "./ChatInput.css";
import { MessageType } from "../../../typings/MessageType";
import { UserType } from "../../../typings/UserType";
import { Button, IconButton, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";

interface IChatInput {
  selectedInboxId: string;
  selectedInboxType: "group" | "personal";
}

export const ChatInput: FC<IChatInput> = ({
  selectedInboxId,
  selectedInboxType,
}) => {
  // Test data for your logged user
  const user: UserType = {
    uid: "user1",
    username: "kkyler",
    avatar: "",
    createdAt: "Wed Oct 27, 10:00 PM",
  };
  // End of test data for your logged user

  const [checkIsTyping, setCheckIsTyping] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaOnChangeHandler = () => {
    // Check if user is typing and make text area auto resize height
    if (textAreaRef.current) {
      textAreaRef.current.style.cssText = "height: auto";
      textAreaRef.current.style.cssText =
        "height: " + textAreaRef.current.scrollHeight + "px";

      if (textAreaRef.current.value) setCheckIsTyping(true);
      if (!textAreaRef.current.value) setCheckIsTyping(false);
    }
  };

  const sendMessageHandler = () => {
    // Check and collect input data, then send it. Finally, scroll to bottom
  };

  const enterToSendMessageHandler = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessageHandler();
    }
  };

  return (
    <div className="chatInput">
      {/* Input container */}
      <div className="chatInput__inputContainer">
        {/* Input */}
        <textarea
          onKeyDown={(event) => enterToSendMessageHandler(event)}
          onChange={textAreaOnChangeHandler}
          ref={textAreaRef}
          placeholder={
            selectedInboxType === "group"
              ? "Send a message to your friends..."
              : "Send a message.."
          }
          autoFocus
          rows={1}
        ></textarea>

        {/* React and send buttons */}
        <div className="chatInput__buttons">
          <Tooltip title="Add emoji">
            <IconButton>
              <InsertEmoticonIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload an image">
            <IconButton>
              <ImageIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload a file">
            <IconButton>
              <FileUploadIcon />
            </IconButton>
          </Tooltip>

          {checkIsTyping ? (
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          ) : (
            <IconButton color="primary">
              <ThumbUpIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};
