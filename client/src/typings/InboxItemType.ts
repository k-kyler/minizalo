import { MessageType } from "./MessageType";

export type InboxItemType = {
  id: string;
  name: string;
  background: string;
  createdAt: string;
  messages?: MessageType[];
  memberIds: string[];
  type: "group" | "personal";
};
