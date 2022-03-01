import { FC, useEffect, useRef } from "react";
import "./search.style.css";
import SearchIcon from "@mui/icons-material/Search";
import NumbersIcon from "@mui/icons-material/Numbers";
import { IconButton, Typography } from "@mui/material";
import { SearchResults } from "@features/search-friend";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  fetchFriendsList,
  searchForFriends,
  selectFriends,
} from "@redux/friends.slice";
import { PageLoading } from "@features/ui/loadings/page-loading/page-loading";
import { useRedirect } from "@hooks/use-redirect";

export const Search: FC = () => {
  const dispatch = useAppDispatch();

  const {
    isSearching,
    searchResults,
    searchKeyword,
    isFetching,
    sendingFriendRequest,
  } = useAppSelector(selectFriends);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setPathnameHandler } = useRedirect();

  const searchHandler = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;

      if (keyword) dispatch(searchForFriends(keyword));
    }
  };

  useEffect(() => {
    dispatch(fetchFriendsList());
    setPathnameHandler();
  }, [sendingFriendRequest]);

  return (
    <>
      {isFetching ? (
        <PageLoading />
      ) : (
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

          {isSearching ? (
            <PageLoading />
          ) : (
            <>
              {/* Results title */}
              {searchResults.length ? (
                <Typography
                  variant="h5"
                  color="GrayText"
                  sx={{ mt: 4, mb: 2.5 }}
                >
                  Search results for <q>{searchKeyword}</q>
                </Typography>
              ) : null}

              {/* Recent searches */}
              {/* Do it later... */}

              {/* Suggest keywords */}
              {!searchResults.length && !searchKeyword ? (
                <div className="search__suggestKeywords">
                  <Typography
                    variant="h5"
                    color="GrayText"
                    sx={{
                      mt: 2,
                      mb: 2.5,
                      textAlign: "center",
                      fontSize: "1.75rem",
                    }}
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
                </div>
              ) : !searchResults.length && searchKeyword ? (
                <Typography
                  variant="h5"
                  color="GrayText"
                  sx={{
                    mt: 2,
                    mb: 2.5,
                    textAlign: "center",
                    fontSize: "1.75rem",
                  }}
                >
                  No results found
                </Typography>
              ) : null}

              {/* Results */}
              {searchResults.length ? <SearchResults /> : null}
            </>
          )}
        </div>
      )}
    </>
  );
};
