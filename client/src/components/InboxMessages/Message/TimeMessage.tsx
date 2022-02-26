import { FC } from "react";
import { Typography } from "@mui/material";

interface ITimeMessage {
  createdAt?: string;
}

export const TimeMessage: FC<ITimeMessage> = ({ createdAt }) => {
  return (
    <div className="timeMessage">
      <Typography variant="caption">
        {createdAt
          ? new Date(createdAt).toDateString() +
            ", " +
            new Date(createdAt).toLocaleTimeString()
          : ""}
      </Typography>
    </div>
  );
};
