import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { selectedFriends } from "../../redux/FriendsSlice";
import { useAppSelector } from "../../redux/hooks";
import { FriendItem } from "./FriendItem";
import "./FriendsList.css";

export const FriendsList: FC = () => {
  const { friends } = useAppSelector(selectedFriends);

  return (
    <div className="friendsList">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Friends
      </Typography>

      <Grid className="friendsList__container" container>
        {friends.map((friend) => (
          <FriendItem key={friend.friendId} {...friend} />
        ))}
      </Grid>
    </div>
  );
};
