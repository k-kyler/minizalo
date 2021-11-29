import { MessageType } from "./MessageType";
import { UserType } from "./UserType";

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
