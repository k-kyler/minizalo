import { MessageType } from "./message.type";
import { UserType } from "./user.type";

export type InboxItemType = {
  inboxId?: string;
  name: string;
  background: string;
  createdAt?: string;
  memberIds: string[];
  type: "group" | "personal";
  ownerId: string;
  messages?: MessageType[];
  users?: UserType[];
  file?: any;
};
