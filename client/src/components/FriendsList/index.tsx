import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { selectFriends } from "../../redux/FriendsSlice";
import { selectUser } from "../../redux/UserSlice";
import { useAppSelector } from "../../redux/hooks";
import { FriendItem } from "./FriendItem";
import "./FriendsList.css";

export const FriendsList: FC = () => {
  const { friends } = useAppSelector(selectFriends);
  const { user } = useAppSelector(selectUser);

  const friendsToDisplay = friends.filter(
    (friend) => friend.friendId !== user.userId
  );

  return (
    <div className="friendsList">
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Friends List
      </Typography>

      <Grid className="friendsList__container" container>
        {friendsToDisplay.length ? (
          friendsToDisplay.map((friend) => (
            <FriendItem key={friend.friendId} {...friend} />
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
