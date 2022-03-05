import { FC, useEffect } from "react";
import "./search.style.css";
import { Typography } from "@mui/material";
import { SearchBar, SearchResults, SearchSuggestion } from "features/search";
import { PageLoading } from "features/ui";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchFriendsList, selectFriends } from "redux/friends.slice";
import { useRedirect } from "hooks";

export const Search: FC = () => {
  const dispatch = useAppDispatch();

  const {
    isSearching,
    searchResults,
    searchKeyword,
    isFetching,
    sendingFriendRequest,
  } = useAppSelector(selectFriends);

  const { setPathnameHandler } = useRedirect();

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
          <SearchBar />

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

              {/* Recent searches (do it later...) */}

              <SearchSuggestion />

              {searchResults.length ? <SearchResults /> : null}
            </>
          )}
        </div>
      )}
    </>
  );
};
