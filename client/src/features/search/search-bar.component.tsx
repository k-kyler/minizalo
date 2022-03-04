import { FC, useRef } from "react";
import "./search-bar.style.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchForFriends } from "redux/friends.slice";
import { useAppDispatch } from "redux/hooks";

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;

      if (keyword) dispatch(searchForFriends(keyword));
    }
  };

  return (
    <div className="searchBar">
      <input
        ref={inputRef}
        type="text"
        className="searchBar__input"
        autoFocus
        placeholder="Search for friends..."
        onKeyUp={(event) =>
          event.key === "Enter" ? searchHandler() : () => {}
        }
      />
      <IconButton onClick={searchHandler}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
