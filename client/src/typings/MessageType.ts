export type MessageType = {
  messageId?: string;
  uid: string;
  username: string;
  avatar: string;
  createdAt?: string;
  content: string;
  type: "text" | "video" | "image";
  inboxRefId: string;
  file?: any;
};
