import {
  FC,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
} from "react";
import "./ChatInput.css";
import { UserType } from "../../../typings/UserType";
import { EmojiList } from "./EmojiList";
import { IconButton, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";

interface IChatInput {
  selectedInboxId: string;
  selectedInboxType: "group" | "personal";
}

export const ChatInput: FC<IChatInput> = ({
  selectedInboxId,
  selectedInboxType,
}) => {
  const { user } = useAppSelector(selectUser);

  const [checkIsTyping, setCheckIsTyping] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>(null);
  const [openEmojiModal, setOpenEmojiModal] = useState(false);

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

  const chooseEmojiHandler = (
    event: MouseEvent<Element, globalThis.MouseEvent>,
    data: IEmojiData
  ) => {
    setChosenEmoji(data);
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current)
      textAreaRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

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
          <div className="chatInput__emoji">
            <EmojiList
              emojiPicker={
                <Picker
                  onEmojiClick={chooseEmojiHandler}
                  disableAutoFocus={true}
                  disableSkinTonePicker={true}
                  disableSearchBar={true}
                  native
                  pickerStyle={{
                    width: "100%",
                    boxShadow: "none",
                    border: "none",
                    overflow: "hidden",
                  }}
                />
              }
              open={openEmojiModal}
            />

            <Tooltip title="Add emoji">
              <IconButton onClick={() => setOpenEmojiModal(!openEmojiModal)}>
                <InsertEmoticonIcon />
              </IconButton>
            </Tooltip>
          </div>

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
            <IconButton color="primary" onClick={sendMessageHandler}>
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
