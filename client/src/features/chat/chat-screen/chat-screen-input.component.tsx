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
import Picker, { IEmojiData } from "emoji-picker-react";
import "./chat-screen-input.style.css";
import { EmojiList } from "./chat-screen-emoji-list.component";
import { IconButton, styled, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { postMessage } from "@redux/message.slice";
import {
  addNewMessage,
  selectInboxes,
  removeMessage,
  changeIsPreviewing,
} from "@redux/inboxes.slice";

interface IChatScreenInput {
  selectedInboxId: string;
  selectedInboxType: "group" | "personal";
  openEmojiModal: boolean;
  setOpenEmojiModal: Dispatch<SetStateAction<boolean>>;
}

interface IUploadData {
  inboxRefId: string;
  messageId: string;
  file: any;
}

export const ChatScreenInput: FC<IChatScreenInput> = ({
  selectedInboxId,
  selectedInboxType,
  openEmojiModal,
  setOpenEmojiModal,
}) => {
  const { user } = useAppSelector(selectUser);
  const { isPreviewing } = useAppSelector(selectInboxes);

  const dispatch = useAppDispatch();

  const [checkIsTyping, setCheckIsTyping] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>(null);
  const [uploadData, setUploadData] = useState<IUploadData>();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    const dispatchResult = await dispatch(
      postMessage({
        uid: user.userId,
        username: user.userName,
        avatar: user.avatar,
        content: textAreaRef.current ? textAreaRef.current.value : "",
        type: "text",
        inboxRefId: selectedInboxId,
      })
    ).unwrap();

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

  const showPreviewHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const message = {
        messageId: `upload-preview-${nanoid()}`,
        uid: user.userId,
        username: user.userName,
        avatar: user.avatar,
        content:
          !event.target.files[0].type.includes("image") &&
          !event.target.files[0].type.includes("video")
            ? event.target.files[0].name
            : URL.createObjectURL(event.target.files[0]),
        file: {
          name: event.target.files[0].name,
          size: event.target.files[0].size,
        },
        type: event.target.files[0].type.includes("image")
          ? "image"
          : event.target.files[0].type.includes("video")
          ? "video"
          : !event.target.files[0].type.includes("image") &&
            !event.target.files[0].type.includes("video")
          ? "document"
          : "",
        inboxRefId: selectedInboxId,
      };

      dispatch(addNewMessage({ message: message as any }));
      setUploadData({
        file: event.target,
        inboxRefId: message.inboxRefId,
        messageId: message.messageId,
      });
    }
  };

  const uploadFileHandler = async () => {
    if (uploadData && uploadData.file && uploadData.file.files[0]) {
      const { code } = await dispatch(
        postMessage({
          uid: user.userId,
          username: user.userName,
          avatar: user.avatar,
          content: "No content",
          file: uploadData?.file.files[0],
          type: uploadData?.file.files[0].type.includes("image")
            ? "image"
            : uploadData?.file.files[0].type.includes("video")
            ? "video"
            : !uploadData?.file.files[0].type.includes("video") &&
              !uploadData?.file.files[0].type.includes("image")
            ? "document"
            : "text",
          inboxRefId: selectedInboxId,
        })
      ).unwrap();

      if (code === "success") {
        dispatch(
          removeMessage({
            inboxRefId: uploadData.inboxRefId,
            messageId: uploadData.messageId,
          })
        );
        dispatch(changeIsPreviewing(false));
      }
    }
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current) {
      textAreaRef.current.value += chosenEmoji.emoji;
      setCheckIsTyping(true);
    }
  }, [chosenEmoji]);

  useEffect(() => {
    if (isPreviewing) uploadFileHandler();
  }, [isPreviewing]);

  return (
    <div className="chatScreenInput">
      {/* Input container */}
      <div className="chatScreenInput__inputContainer">
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
        <div className="chatScreenInput__buttons">
          <div className="chatScreenInput__emoji">
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
                accept="image/*, video/*, .pdf, .doc, .docx, .xls, .xlsx, .txt, .rar, .zip"
                id="upload-file"
                type="file"
                onChange={showPreviewHandler}
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
