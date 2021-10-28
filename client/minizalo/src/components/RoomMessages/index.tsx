import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import "./RoomMessages.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { RoomItemType } from "../../typings/RoomItemType";
import { Message } from "./Message";

interface IRoomMessages {
  selectedRoomId: string;
  roomItems: RoomItemType[];
}

export const RoomMessages: FC<IRoomMessages> = ({
  selectedRoomId,
  roomItems,
}) => {
  const selectedRoom = roomItems.filter(
    (roomItem) => roomItem.id === selectedRoomId
  )[0];

  return (
    <div className="roomMessages">
      {/* Header */}
      <div className="roomMessages__header">
        <Tooltip title={selectedRoom.name}>
          <div className="roomMessages__headerLeft">
            <Avatar alt={selectedRoom.name} src={selectedRoom.background} />
            <Typography className="roomMessages__info" variant="h6">
              {selectedRoom.name}
            </Typography>
          </div>
        </Tooltip>

        <div className="roomMessages__headerRight">
          <Tooltip title="Invite member">
            <IconButton>
              <GroupAddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search messages">
            <IconButton>
              <ManageSearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View media & files">
            <IconButton>
              <BarChartIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Messages */}
      <ul className="roomMessages__messages">
        {selectedRoom.messages?.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </ul>

      {/* Chat input */}
    </div>
  );
};
