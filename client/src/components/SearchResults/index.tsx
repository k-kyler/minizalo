import { FC } from "react";
import FlipMove from "react-flip-move";
import "./SearchResults.css";
import { SearchResult } from "./SearchResult";
import { useAppSelector } from "../../redux/hooks";
import { selectFriends } from "../../redux/FriendsSlice";

export const SearchResults: FC = () => {
  const { searchResults } = useAppSelector(selectFriends);

  return (
    <ul className="searchResults">
      <FlipMove leaveAnimation="fade">
        {searchResults.map((result) => (
          <SearchResult key={result.userId} {...result} />
        ))}
      </FlipMove>
    </ul>
  );
};
