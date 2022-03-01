import { FC } from "react";
import "./search-results.style.css";
import { SearchItem } from "./search-item.component";
import { useAppSelector } from "@redux/hooks";
import { selectFriends } from "@redux/friends.slice";

export const SearchResults: FC = () => {
  const { searchResults } = useAppSelector(selectFriends);

  return (
    <ul className="searchResults">
      {searchResults.map((result) => (
        <SearchItem key={result.userId} {...result} />
      ))}
    </ul>
  );
};
