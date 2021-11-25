import { FC } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export const Search: FC = () => {
  return (
    <div className="search">
      <div className="search__inner">
        <input
          type="text"
          className="search__input"
          autoFocus
          placeholder="Search for friends..."
        />
        <IconButton className="search__button">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};
