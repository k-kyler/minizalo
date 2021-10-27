import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC, useState } from "react";
import "./RoomList.css";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { RoomItem } from "./RoomItem";
import { RoomItemType } from "../../typings/RoomItemType";

export const RoomList: FC = () => {
  // Test data
  const roomItems: RoomItemType[] = [
    {
      id: "1",
      name: "kkyler and his friends",
      background: "",
      createdAt: "Wed Oct 27, 10:02 PM",
      messages: [
        {
          id: "1",
          username: "kkyler",
          avatar: "",
          createdAt: "Wed Oct 27, 10:03 PM",
          text: "Hello my friends",
          type: "text",
        },
        {
          id: "2",
          username: "Lung Yu",
          avatar: "",
          createdAt: "Wed Oct 27, 10:03 PM",
          text: "Eyy bro",
          type: "text",
        },
        {
          id: "3",
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
    <div className="roomList">
      {/* Header */}
      <div className="roomList__header">
        <Typography variant="h6" sx={{ fontWeight: "400" }}>
          Rooms
        </Typography>

        <div className="roomList__settings">
          <Tooltip title="Create new room">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Minimize">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Rooms */}
      <div className="roomList__rooms">
        {roomItems.map((room) => (
          <RoomItem
            key={room.id}
            {...room}
            selectedRoomId={selectedRoomId}
            clickHandler={() => setSelectedRoomId(room.id)}
          />
        ))}
      </div>
    </div>
  );
};
