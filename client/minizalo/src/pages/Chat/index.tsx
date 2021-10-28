import { Grid, Container } from "@mui/material";
import { FC, useState } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { InboxItemType } from "../../typings/InboxItemType";
import "./Chat.css";

export const Chat: FC = () => {
  // Test data (need to be sorted by latest inboxes)
  const inboxItems: InboxItemType[] = [
    {
      id: "1",
      name: "kkyler and his friends",
      background: "",
      createdAt: "Wed Oct 27, 10:02 PM",
      type: "group",
      memberIds: ["user1", "user2", "user3"],
      messages: [
        {
          id: "1",
          uid: "user1",
          username: "kkyler",
          avatar: "https://avatars.githubusercontent.com/u/66368949?v=4",
          createdAt: "Wed Oct 27, 10:03 PM",
          text: "Hello my friends, bla bla bla bla bla bla bla bla bla bla bla",
          type: "text",
        },
        {
          id: "2",
          uid: "user2",
          username: "Lung Yu",
          avatar: "",
          createdAt: "Wed Oct 27, 10:03 PM",
          text: "Eyy bro",
          type: "text",
        },
        {
          id: "3",
          uid: "user3",
          username: "Kent",
          avatar: "",
          createdAt: "Wed Oct 27, 10:04 PM",
          text: "What's up",
          type: "text",
        },
      ],
    },
    {
      id: "2",
      name: "Lung Yu",
      background: "",
      createdAt: "Wed Oct 26, 8:21 PM",
      messages: [],
      memberIds: ["user1", "user2"],
      type: "personal",
    },
    {
      id: "3",
      name: "Kent",
      background: "",
      createdAt: "Wed Oct 26, 8:12 PM",
      messages: [],
      memberIds: ["user1", "user3"],
      type: "personal",
    },
  ];
  // End of test data

  const [selectedInboxId, setSelectedInboxId] = useState(inboxItems[0].id);

  return (
    <Container className="chat">
      <Grid container sx={{ height: "100%" }}>
        {/* Inbox list */}
        <Grid item md={3}>
          <InboxList
            selectedInboxId={selectedInboxId}
            setSelectedInboxId={setSelectedInboxId}
            inboxItems={inboxItems}
          />
        </Grid>

        {/* Inbox messages */}
        <Grid item md={9}>
          <InboxMessages
            selectedInboxId={selectedInboxId}
            inboxItems={inboxItems}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
