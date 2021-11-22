import {
  FC,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import "./ChatInput.css";
import { EmojiList } from "./EmojiList";
import { IconButton, styled, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";
import { postMessage } from "../../../redux/MessageSlice";
import { showPreviewMessage } from "../../../redux/InboxesSlice";

interface IChatInput {
  selectedInboxId: string;
  selectedInboxType: "group" | "personal";
  openEmojiModal: boolean;
  setOpenEmojiModal: Dispatch<SetStateAction<boolean>>;
}

export const ChatInput: FC<IChatInput> = ({
  selectedInboxId,
  selectedInboxType,
  openEmojiModal,
  setOpenEmojiModal,
}) => {
  const { user } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const [checkIsTyping, setCheckIsTyping] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>(null);
  const [inputFilePreview, setInputFilePreview] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const Input = styled("input")({
    display: "none",
  });

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

  const sendMessageHandler = async () => {
    const formData = new FormData();

    formData.append("uid", user.userId);
    formData.append("username", user.userName);
    formData.append("avatar", user.avatar);
    formData.append(
      "content",
      textAreaRef.current ? textAreaRef.current.value : ""
    );
    formData.append("type", "text");
    formData.append("inboxRefId", selectedInboxId);

    const dispatchResult = await dispatch(postMessage(formData)).unwrap();

    if (dispatchResult.code === "success" && textAreaRef.current) {
      textAreaRef.current.value = "";
      textAreaRef.current.style.cssText = "height: auto";
      textAreaRef.current.style.cssText =
        "height: " + textAreaRef.current.scrollHeight + "px";

      if (!textAreaRef.current.value) setCheckIsTyping(false);
    }
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

  const showPreview = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInputFilePreview(true);
      dispatch(
        showPreviewMessage({
          previewMessage: {
            messageId: "upload-preview",
            uid: user.userId,
            username: user.userName,
            avatar: user.avatar,
            content: URL.createObjectURL(event.target.files[0]),
            type: event.target.files[0].type.includes("image")
              ? "image"
              : event.target.files[0].type.includes("video")
              ? "video"
              : "text",
            inboxRefId: selectedInboxId,
          },
        })
      );
    }
  };

  const uploadFileHandler = async () => {};

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current) {
      textAreaRef.current.value += chosenEmoji.emoji;
      setCheckIsTyping(true);
    }
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

          <Tooltip title="Upload">
            <label htmlFor="upload-file">
              <Input
                accept="image/*, video/*, .pdf, .doc, .docx, .xls, .xlsx"
                id="upload-file"
                type="file"
                ref={inputFileRef}
                // value={inputFile}
                // onChange={showPreview}
              />

              <IconButton component="span">
                <FileUploadIcon />
              </IconButton>
            </label>
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
