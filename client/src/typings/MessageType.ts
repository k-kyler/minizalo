export type MessageType = {
  messageId?: string;
  uid: string;
  username: string;
  avatar: string;
  createdAt?: string;
  content: string;
  type: "text" | "video" | "image" | "document";
  inboxRefId: string;
  file?: any;
};
