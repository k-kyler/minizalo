import { Avatar, IconButton, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { forwardRef } from "react";
import "./SearchResult.css";
import { UserType } from "../../../typings/UserType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addFriend } from "../../../redux/FriendsSlice";
import { selectUser } from "../../../redux/UserSlice";

interface ISearchResult extends UserType {}

export const SearchResult = forwardRef<HTMLLIElement, ISearchResult>(
  ({ userId, userName, avatar }, ref) => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(selectUser);

    const addFriendHandler = () => {
      dispatch(
        addFriend({
          friendId: userId,
          userRefId: user.userId,
        })
      );
    };

    return (
      <li className="searchResult" ref={ref}>
        <div className="searchResult__info">
          <Avatar src={avatar} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {userName}
          </Typography>
        </div>

        <IconButton
          className="searchResult__action"
          sx={{ color: "#0b81ff" }}
          onClick={addFriendHandler}
        >
          <PersonAddIcon />
        </IconButton>
      </li>
    );
  }
);
