import { HubConnectionBuilder } from "@microsoft/signalr";
import { Grid, Container } from "@mui/material";
import { FC, useEffect } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectInboxes,
  addNewMessage,
  fetchInboxes,
} from "../../redux/InboxesSlice";
import "./Chat.css";

export const Chat: FC = () => {
  const { isFetching } = useAppSelector(selectInboxes);

  const dispatch = useAppDispatch();

  const createSignalRConnection = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/chat`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        // Receive message event listener
        connection.on("ReceiveMessage", (message) => {
          dispatch(
            addNewMessage({
              message,
            })
          );
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    createSignalRConnection();
    dispatch(fetchInboxes());
  }, []);

  return (
    <>
      {isFetching ? (
        <PageLoading />
      ) : (
        <Container className="chat">
          <Grid container sx={{ height: "100%" }}>
            {/* Inbox list */}
            <Grid item md={3}>
              <InboxList />
            </Grid>

            {/* Inbox messages */}
            <Grid item md={9}>
              <InboxMessages />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
