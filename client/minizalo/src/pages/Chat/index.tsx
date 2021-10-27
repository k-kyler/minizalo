import { Grid, Container } from "@mui/material";
import { FC } from "react";
import { RoomList } from "../../components/RoomList";
import "./Chat.css";

export const Chat: FC = () => {
  return (
    <Container className="chat">
      <Grid container sx={{ height: "100%" }}>
        {/* Room list */}
        <Grid item md={3}>
          <RoomList />
        </Grid>

        {/* Room messages */}
        <Grid item md={9}></Grid>
      </Grid>
    </Container>
  );
};
