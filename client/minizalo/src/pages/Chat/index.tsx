import { Grid, Container } from "@mui/material";
import { FC, useState } from "react";
import { RoomList } from "../../components/RoomList";
import { RoomMessages } from "../../components/RoomMessages";
import { RoomItemType } from "../../typings/RoomItemType";
import "./Chat.css";

export const Chat: FC = () => {
  // Test data (need to be sorted by newest joined room)
  const roomItems: RoomItemType[] = [
    {
      id: "1",
      name: "kkyler and his friends",
      background: "",
      createdAt: "Wed Oct 27, 10:02 PM",
      messages: [
        {
          id: "1",
          uid: "user1",
          username: "kkyler",
          avatar: "",
          createdAt: "Wed Oct 27, 10:03 PM",
          text: "Hello my friends",
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
      name: "KKL Team",
      background: "",
      createdAt: "Wed Oct 27, 8:42 PM",
      messages: [],
    },
  ];
  // End of test data

  const [selectedRoomId, setSelectedRoomId] = useState(roomItems[0].id);

  return (
    <Container className="chat">
      <Grid container sx={{ height: "100%" }}>
        {/* Room list */}
        <Grid item md={3}>
          <RoomList
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
            roomItems={roomItems}
          />
        </Grid>

        {/* Room messages */}
        <Grid item md={9}>
          <RoomMessages selectedRoomId={selectedRoomId} roomItems={roomItems} />
        </Grid>
      </Grid>
    </Container>
  );
};
