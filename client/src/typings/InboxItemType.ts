export type InboxItemType = {
  inboxId: string;
  name: string;
  background: string;
  createdAt: string;
  memberIds: string[];
  type: "group" | "personal";
};
