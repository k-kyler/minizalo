import { FC, lazy, Suspense } from "react";
import { Grid, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { selectFriends } from "redux/friends.slice";
import { useAppSelector } from "redux/hooks";
import "./friend-list.style.css";

const FriendItem = lazy(() => import("./friend-item.component"));

export const FriendList: FC = () => {
  const { friends } = useAppSelector(selectFriends);

  return (
    <div className="friendList">
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Friend List
      </Typography>

      <Grid className="friendList__container" container>
        {friends.length ? (
          friends.map((friend) => (
            <Suspense fallback={""}>
              <FriendItem key={nanoid()} {...friend} />
            </Suspense>
          ))
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
