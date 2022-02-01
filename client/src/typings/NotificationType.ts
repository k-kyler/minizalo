export type notificationType = {
  id: string;
  type: "system" | "friend-request";
  title?: string;
  description?: string;
  timestamp?: string;
};
