import { FC } from "react";
import List from "@mui/material/List";
import { ListItem, Typography } from "@mui/material";
import { notificationType } from "../../typings/NotificationType";
import { NotificationItem } from "./NotificationItem";
import "./NotificationsList.css";

const notificationsTestData: notificationType[] = [
  {
    id: "1",
    type: "system",
    title: "Welcome to MiniZalo v1.0!",
    description: "Message from creators",
    timestamp: "2 hours",
  },
  {
    id: "2",
    type: "friend-request",
    timestamp: "1 minute",
  },
];

export const NotificationsList: FC = () => {
  return (
    <List
      className="notificationsList"
      sx={{
        bgcolor: "background.paper",
      }}
    >
      {/* Title */}
      <ListItem alignItems="flex-start" sx={{ py: 0 }}>
        <Typography variant="h6">Notifications</Typography>
      </ListItem>

      {/* Notification items */}
      {notificationsTestData.map((item) => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </List>
  );
};
