import { Typography } from "@mui/material";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useAppSelector } from "redux/hooks";
import { selectFriends } from "redux/friends.slice";
import "./search-suggestion.style.css";

export const SearchSuggestion = () => {
  const { searchResults, searchKeyword } = useAppSelector(selectFriends);

  return (
    <>
      {!searchResults.length && !searchKeyword ? (
        <div className="searchSuggestion__keywords">
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

          <div className="searchSuggestion__keyword">
            <NumbersIcon />
            <Typography variant="body2" sx={{ ml: 1.25 }}>
              People you may know
            </Typography>
          </div>

          <div className="searchSuggestion__keyword">
            <NumbersIcon />
            <Typography variant="body2" sx={{ ml: 1.25 }}>
              People you may interested in
            </Typography>
          </div>

          <div className="searchSuggestion__keyword">
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
    </>
  );
};
