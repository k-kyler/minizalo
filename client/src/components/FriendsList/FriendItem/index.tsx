import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { FriendType } from "../../../typings/FriendType";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./FriendItem.css";

interface IFriendItem extends FriendType {}

export const FriendItem: FC<IFriendItem> = ({ friendId, data, userRefId }) => {
  return (
    <Grid item md={6} className="friendItem">
      <div className="friendItem__info">
        <Avatar src={data.avatar} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {data.userName}
        </Typography>
      </div>

      <IconButton className="friendItem__action">
        <MoreHorizIcon />
      </IconButton>
    </Grid>
  );
};
