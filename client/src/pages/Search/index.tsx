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

  const [checked, setChecked] = useState(false);

  const results: any = [];

  const searchHandler = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;

      // do something...
      console.log(keyword);
    }
  };

  return (
    <div className="search">
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
            Mutual friends
          </Typography>
        </div>
      </div> */}

      {/* Results */}
      <SearchResults />

      <Zoom in={checked}>
        <Fab color="primary" className="search__scrollToTop">
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </div>
  );
};
