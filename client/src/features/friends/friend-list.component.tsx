import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectFriends } from "@redux/friends.slice";
import { useAppSelector } from "@redux/hooks";
import { FriendItem } from "./friend-item.component";
import "./friend-list.style.css";

export const FriendsList: FC = () => {
  const { friends } = useAppSelector(selectFriends);

  return (
    <div className="friendsList">
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Friends List
      </Typography>

      <Grid className="friendsList__container" container>
        {friends.length ? (
          friends.map((friend) => <FriendItem key={nanoid()} {...friend} />)
        ) : (
          <Grid item md={12}>
            <Typography
              variant="body1"
              color="GrayText"
              sx={{ textAlign: "center" }}
              gutterBottom
            >
              You've no friends
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
