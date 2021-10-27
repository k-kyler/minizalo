import { MessageType } from "./MessageType";

export type RoomItemType = {
  id: string;
  name: string;
  background: string;
  createdAt: string;
  messages?: MessageType[];
};
