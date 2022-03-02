import { useEffect, useState, FC } from "react";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "./search-item.style.css";
import { UserType } from "@typings/user.type";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { addFriend, selectFriends } from "@redux/friends.slice";
import { selectUser } from "@redux/user.slice";

interface ISearchItem extends UserType {}

export const SearchItem: FC<ISearchItem> = ({ userId, userName, avatar }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectUser);
  const { friends } = useAppSelector(selectFriends);

  const [isFriend, setIsFriend] = useState(false);

  // const addFriendHandler = () => {
  //   dispatch(
  //     addFriend({
  //       friendId: userId,
  //       userRefId: user.userId,
  //     })
  //   );
  // };

  const checkIsFriend = () => {
    const isFriend = friends.filter(
      (friend) => friend.senderId === userId || friend.receiverId === userId
    );

    if (isFriend.length) setIsFriend(true);
  };

  useEffect(checkIsFriend, []);

  if (userId === user.userId) return null;
  return (
    <li className="searchItem">
      <div className="searchItem__info">
        <Avatar
          src={`${import.meta.env.VITE_API_URL}/Resources/${avatar}`}
          alt={userName}
        />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {userName}
        </Typography>
      </div>

      <Tooltip title={isFriend ? "You're friends" : "Send friend request"}>
        {isFriend ? (
          <IconButton sx={{ cursor: "default" }}>
            <BookmarkAddedIcon />
          </IconButton>
        ) : (
          <IconButton
            className="searchItem__action"
            sx={{ color: "#0b81ff" }}
            // onClick={addFriendHandler}
          >
            <PersonAddIcon />
          </IconButton>
        )}
      </Tooltip>
    </li>
  );
};
