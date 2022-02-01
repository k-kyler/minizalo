import { FC } from "react";
import List from "@mui/material/List";
import { notificationType } from "../../typings/NotificationType";
import { NotificationItem } from "./NotificationItem";

const notificationsTestData: notificationType[] = [
  {
    id: "1",
    type: "system",
    title: "Welcome to MiniZalo v1.0!",
    description: "Message from creators",
    timestamp: "1 minute",
  },
  {
    id: "2",
    type: "friend-request",
    timestamp: "2 hours",
  },
];

export const NotificationsList: FC = () => {
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 360,
        maxHeight: 800,
        bgcolor: "background.paper",
        overflowY: "auto",
      }}
    >
      {notificationsTestData.map((item) => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </List>
  );
};
