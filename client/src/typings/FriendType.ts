import { UserType } from "./UserType";

export type FriendType = {
  senderId: string;
  senderData: UserType;
  receiverId: string;
  receiverData: UserType;
  beFriendAt: string;
};
