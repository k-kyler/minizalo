import { FC, useEffect } from "react";
import { Container } from "@mui/material";
import { FriendsList } from "@features/friends";
import { PageLoading } from "@features/ui/loadings/page-loading/page-loading";
import { useRedirect } from "@hooks/use-redirect";
import { fetchFriendsList, selectFriends } from "@redux/friends.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
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
      {isFetching ? <PageLoading /> : <FriendsList />}
    </Container>
  );
};
