import { FC } from "react";
import "./EmojiList.css";

interface IEmojiListProps {
  emojiPicker: any;
  open: boolean;
}

export const EmojiList: FC<IEmojiListProps> = ({ emojiPicker, open }) => {
  if (!open) return null;
  return <div className="emojiList">{emojiPicker}</div>;
};
