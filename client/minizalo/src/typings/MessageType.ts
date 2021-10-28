export type MessageType = {
  id: string;
  uid: string;
  username: string;
  avatar: string;
  createdAt: string;
  text?: string;
  video?: string;
  image?: string;
  type: "text" | "video" | "image";
};
