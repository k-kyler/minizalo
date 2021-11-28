import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { FriendType } from "../../../typings/FriendType";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./FriendItem.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/UserSlice";

interface IFriendItem extends FriendType {}

export const FriendItem: FC<IFriendItem> = ({
  senderId,
  senderData,
  receiverId,
  receiverData,
  beFriendAt,
}) => {
  const { user } = useAppSelector(selectUser);

  if (senderId !== user.userId) {
    return (
      <Grid item md={6} className="friendItem">
        <div className="friendItem__info">
          <Avatar src={senderData.avatar} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {senderData.userName}
          </Typography>
        </div>

        <IconButton className="friendItem__action">
          <MoreHorizIcon />
        </IconButton>
      </Grid>
    );
  } else if (receiverId !== user.userId) {
    return (
      <Grid item md={6} className="friendItem">
        <div className="friendItem__info">
          <Avatar src={receiverData.avatar} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {receiverData.userName}
          </Typography>
        </div>

        <IconButton className="friendItem__action">
          <MoreHorizIcon />
        </IconButton>
      </Grid>
    );
  }
  return null;
};
