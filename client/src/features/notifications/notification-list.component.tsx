import React from "react";
import { FC } from "react";
import List from "@mui/material/List";
import { ListItem, Typography } from "@mui/material";
import { notificationType } from "typings/notification.type";
import { NotificationItem } from "./notification-item.component";
import "./notification-list.style.css";

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

export const NotificationList: FC = () => {
  return (
    <List
      className="notificationList"
      sx={{
        bgcolor: "background.paper",
      }}
    >
      {/* Title */}
      <ListItem alignItems="flex-start" sx={{ py: 0 }}>
        <Typography variant="h6" component="span">
          Notifications
        </Typography>
      </ListItem>

      {/* Notification items */}
      {notificationsTestData.map((item) => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </List>
  );
};
