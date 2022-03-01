import { UserType } from "./user.type";

export type FriendType = {
  senderId: string;
  senderData: UserType;
  receiverId: string;
  receiverData: UserType;
  beFriendAt: string;
};
