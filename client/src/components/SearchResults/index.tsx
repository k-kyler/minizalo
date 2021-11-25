import { FC } from "react";
import FlipMove from "react-flip-move";
import "./SearchResults.css";
import { SearchResult } from "./SearchResult";
import { SearchResultType } from "../../typings/SearchResultType";
import { Typography } from "@mui/material";

export const SearchResults: FC = () => {
  // Test data
  const searchResults: SearchResultType[] = [
    {
      uid: "1",
      username: "Quang Khai",
      avatar: "https://avatars.githubusercontent.com/u/66368949?v=4",
    },
    {
      uid: "2",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/663689?v=4",
    },
    {
      uid: "2",
      username: "Khai Bui",
      avatar: "https://avatars.githubusercontent.com/u/663689213?v=4",
    },
    {
      uid: "3",
      username: "Khai Bui",
      avatar: "https://avatars.githubusercontent.com/u/1233565?v=4",
    },
    {
      uid: "4",
      username: "Khai Quang",
      avatar: "https://avatars.githubusercontent.com/u/636813?v=4",
    },
    {
      uid: "5",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/63689213?v=4",
    },
    {
      uid: "6",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/63689213?v=4",
    },
    {
      uid: "7",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/63689213?v=4",
    },
    {
      uid: "8",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/63689213?v=4",
    },
    {
      uid: "9",
      username: "Khai",
      avatar: "https://avatars.githubusercontent.com/u/63689213?v=4",
    },
  ];
  // End of test data

  return (
    <div className="searchResults">
      <Typography
        variant="h5"
        color="GrayText"
        className="searchResults__title"
      >
        Search results for Khai
      </Typography>

      <ul className="searchResults__list">
        <FlipMove leaveAnimation="fade">
          {searchResults.map((result) => (
            <SearchResult key={result.uid} {...result} />
          ))}
        </FlipMove>
      </ul>
    </div>
  );
};
