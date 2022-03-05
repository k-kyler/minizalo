import { FC, useEffect } from "react";
import { Container } from "@mui/material";
import { FriendList } from "features/friends";
import { PageLoading } from "features/ui";
import { fetchFriendsList, selectFriends } from "redux/friends.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useRedirect } from "hooks";
import "./friends.style.css";

export const Friends: FC = () => {
  const { setPathnameHandler } = useRedirect();

  const dispatch = useAppDispatch();

  const { isFetching } = useAppSelector(selectFriends);

  useEffect(() => {
    dispatch(fetchFriendsList());
    setPathnameHandler();
  }, []);

  return (
    <Container className="friends" maxWidth="md">
      {isFetching ? <PageLoading /> : <FriendList />}
    </Container>
  );
};
