import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Button, ListItemButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { notificationType } from "@typings/notification.type";
import Logo from "@assets/logo.png";

interface INotificationItem extends notificationType {}

export const NotificationItem: FC<INotificationItem> = ({
  type,
  title,
  description,
  timestamp,
}) => {
  return (
    <ListItem alignItems="flex-start" sx={{ p: 0 }}>
      <ListItemButton>
        <ListItemAvatar>
          {type === "system" ? (
            <Avatar alt="MiniZalo" src={Logo} />
          ) : type === "friend-request" ? (
            <Avatar
              alt="Thuan Long"
              src={
                "https://localhost:5001/Resources/67281185_1144370339104288_4585592498671321088_n.jpg"
              }
            />
          ) : null}
        </ListItemAvatar>
        <ListItemText
          primary={
            type === "system" ? (
              title
            ) : type === "friend-request" ? (
              <>
                <span style={{ fontWeight: 500 }}>Thuan Long</span> want to be
                your friend
              </>
            ) : (
              ""
            )
          }
          secondary={
            <>
              {type === "system" ? (
                description
              ) : type === "friend-request" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0 0.5rem",
                    margin: "0.5rem 0",
                  }}
                >
                  <Button variant="contained" size="small">
                    Accept
                  </Button>
                  <Button variant="contained" color="inherit" size="small">
                    Decline
                  </Button>
                </div>
              ) : null}

              <Typography
                variant="body2"
                sx={{ fontWeight: 500, mt: 0.5 }}
                color="text.primary"
              >
                {timestamp} ago
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
