import { Avatar, IconButton, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { forwardRef } from "react";
import { FriendType } from "../../../typings/FriendType";
import "./SearchResult.css";

interface ISearchResult extends FriendType {}

export const SearchResult = forwardRef<HTMLLIElement, ISearchResult>(
  ({ friendId, data, userRefId }, ref) => {
    return (
      <li className="searchResult" ref={ref}>
        <div className="searchResult__info">
          <Avatar src={data.avatar} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {data.userName}
          </Typography>
        </div>

        <IconButton className="searchResult__action" sx={{ color: "#0b81ff" }}>
          <PersonAddIcon />
        </IconButton>
      </li>
    );
  }
);
