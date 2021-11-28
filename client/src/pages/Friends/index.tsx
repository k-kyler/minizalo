import { Container } from "@mui/material";
import { FC, useEffect } from "react";
import { FriendsList } from "../../components/FriendsList";
import { useRedirect } from "../../hooks/useRedirect";
import "./Friends.css";

export const Friends: FC = () => {
  const { setPathnameHandler } = useRedirect();

  useEffect(setPathnameHandler, []);

  return (
    <Container className="friends" maxWidth="md">
      <FriendsList />
    </Container>
  );
};
