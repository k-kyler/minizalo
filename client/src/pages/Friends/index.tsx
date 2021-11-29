import { Container } from "@mui/material";
import { FC, useEffect } from "react";
import { FriendsList } from "../../components/FriendsList";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useRedirect } from "../../hooks/useRedirect";
import { fetchFriendsList, selectFriends } from "../../redux/FriendsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Friends.css";

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
