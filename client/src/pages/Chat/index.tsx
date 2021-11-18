import { HubConnectionBuilder } from "@microsoft/signalr";
import { Grid, Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectInboxes, addNewMessage } from "../../redux/InboxesSlice";
import "./Chat.css";

export const Chat: FC = () => {
  const inboxes = useAppSelector(selectInboxes);

  const dispatch = useAppDispatch();

  const [selectedInboxId, setSelectedInboxId] = useState(
    inboxes.inboxes[0].inboxId
  );

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

  useEffect(createSignalRConnection, []);

  return (
    <Container className="chat">
      <Grid container sx={{ height: "100%" }}>
        {/* Inbox list */}
        <Grid item md={3}>
          <InboxList
            selectedInboxId={selectedInboxId}
            setSelectedInboxId={setSelectedInboxId}
            inboxItems={inboxes.inboxes}
          />
        </Grid>

        {/* Inbox messages */}
        <Grid item md={9}>
          <InboxMessages
            selectedInboxId={selectedInboxId}
            inboxItems={inboxes.inboxes}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
