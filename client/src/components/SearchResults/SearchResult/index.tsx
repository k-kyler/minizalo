import { Avatar, IconButton, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { forwardRef } from "react";
import { SearchResultType } from "../../../typings/SearchResultType";
import "./SearchResult.css";

interface ISearchResult extends SearchResultType {}

export const SearchResult = forwardRef<HTMLLIElement, ISearchResult>(
  ({ uid, username, avatar }, ref) => {
    return (
      <li className="searchResult" ref={ref}>
        <div className="searchResult__info">
          <Avatar src={avatar} />
          <Typography variant="body1" sx={{ ml: 1.5 }}>
            {username}
          </Typography>
        </div>

        <IconButton className="searchResult__action" sx={{ color: "#0b81ff" }}>
          <PersonAddIcon />
        </IconButton>
      </li>
    );
  }
);
