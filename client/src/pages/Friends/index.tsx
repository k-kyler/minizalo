import { Container } from "@mui/material";
import { FC } from "react";
import { FriendsList } from "../../components/FriendsList";
import "./Friends.css";

export const Friends: FC = () => {
  return (
    <Container className="friends" maxWidth="md">
      <FriendsList />
    </Container>
  );
};
