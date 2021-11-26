import { FC, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NumbersIcon from "@mui/icons-material/Numbers";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, IconButton, Typography } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import "./Search.css";
import { SearchResults } from "../../components/SearchResults";

export const Search: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [displayFloatButton, setDisplayFloatButton] = useState(false);

  const searchHandler = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;

      // do something...
      console.log(keyword);
    }
  };

  const showFloatButtonHandler = () => {
    searchRef.current && searchRef.current.scrollTop !== 0
      ? setDisplayFloatButton(true)
      : setDisplayFloatButton(false);
  };

  const scrollToTopHandler = () => {
    searchRef.current ? (searchRef.current.scrollTop = 0) : null;
  };

  return (
    <div className="search" onScroll={showFloatButtonHandler} ref={searchRef}>
      {/* Search bar */}
      <div className="search__bar">
        <input
          ref={inputRef}
          type="text"
          className="search__input"
          autoFocus
          placeholder="Search for people..."
          onKeyUp={(event) =>
            event.key === "Enter" ? searchHandler() : () => {}
          }
        />
        <IconButton className="search__button" onClick={searchHandler}>
          <SearchIcon />
        </IconButton>
      </div>
      <Typography variant="h5" color="GrayText" sx={{ mt: 4, mb: 2.5 }}>
        Search results for Khai
      </Typography>

      {/* Recent searches */}
      {/* Do it later... */}

      {/* Suggest keywords */}
      {/* <div className="search__suggestKeywords">
        <Typography
          variant="h5"
          color="GrayText"
          sx={{ mb: 2.5, textAlign: "center", fontSize: "1.75rem" }}
        >
          Try searching for
        </Typography>

        <div className="search__suggest">
          <NumbersIcon />
          <Typography variant="body2" sx={{ ml: 1.25 }}>
            People you may know
          </Typography>
        </div>

        <div className="search__suggest">
          <NumbersIcon />
          <Typography variant="body2" sx={{ ml: 1.25 }}>
            People you may interested in
          </Typography>
        </div>

        <div className="search__suggest">
          <NumbersIcon />
          <Typography variant="body2" sx={{ ml: 1.25 }}>
            Friends of friends
          </Typography>
        </div>
      </div> */}

      {/* Results */}
      <SearchResults />

      <Zoom in={displayFloatButton}>
        <Fab
          color="primary"
          className="search__scrollToTop"
          size="medium"
          onClick={scrollToTopHandler}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </div>
  );
};
