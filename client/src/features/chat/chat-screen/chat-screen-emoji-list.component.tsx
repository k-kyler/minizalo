import { FC } from "react";
import "./chat-screen-emoji-list.css";

interface IChatScreenEmojiList {
  emojiPicker: any;
  open: boolean;
}

export const EmojiList: FC<IChatScreenEmojiList> = ({ emojiPicker, open }) => {
  if (!open) return null;
  return <div className="chatScreenEmojiList">{emojiPicker}</div>;
};
