import { Grid, Container } from "@mui/material";
import { FC, useState } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { useAppSelector } from "../../redux/hooks";
import { selectInboxes } from "../../redux/InboxesSlice";
import "./Chat.css";

export const Chat: FC = () => {
  const inboxes = useAppSelector(selectInboxes);

  const [selectedInboxId, setSelectedInboxId] = useState(
    inboxes.inboxes[0].inboxId
  );

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
