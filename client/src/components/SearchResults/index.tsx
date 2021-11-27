import { FC } from "react";
import FlipMove from "react-flip-move";
import "./SearchResults.css";
import { SearchResult } from "./SearchResult";
import { FriendType } from "../../typings/FriendType";

export const SearchResults: FC = () => {
  // Test data
  const searchResults: FriendType[] = [
    {
      friendId: "1",
      data: {
        userId: "1",
        userName: "Quang Khai",
        avatar: "https://avatars.githubusercontent.com/u/66368949?v=4",
        email: "khai@gmail.com",
        createdAt: "test time",
      },
      userRefId: "2",
    },
  ];
  // End of test data

  return (
    <ul className="searchResults">
      <FlipMove leaveAnimation="fade">
        {searchResults.map((result) => (
          <SearchResult key={result.friendId} {...result} />
        ))}
      </FlipMove>
    </ul>
  );
};
