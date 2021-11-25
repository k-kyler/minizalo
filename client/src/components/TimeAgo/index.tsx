import { FC } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

interface ITimeAgo {
  timestamp: string;
}

export const TimeAgo: FC<ITimeAgo> = ({ timestamp }) => {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);

    timeAgo = `${timePeriod}`;

    if (timeAgo === "less than a minute") timeAgo = "1s";
  }

  return (
    <span
      title={
        new Date(timestamp).toDateString() +
        ", " +
        new Date(timestamp).toLocaleTimeString()
      }
    >
      {timeAgo}
    </span>
  );
};
