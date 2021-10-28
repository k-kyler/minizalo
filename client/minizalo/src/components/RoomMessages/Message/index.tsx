import { FC } from "react";
import "./Message.css";
import { MessageType } from "../../../typings/MessageType";

interface IMessage extends MessageType {}

export const Message: FC<IMessage> = ({
  id,
  uid,
  username,
  avatar,
  text,
  video,
  image,
  type,
  createdAt,
}) => {
  return <li></li>;
};
