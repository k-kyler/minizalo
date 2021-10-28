import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC, SetStateAction, Dispatch } from "react";
import "./RoomList.css";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RoomItem } from "./RoomItem";
import { RoomItemType } from "../../typings/RoomItemType";

interface IRoomList {
  selectedRoomId: string;
  setSelectedRoomId: Dispatch<SetStateAction<string>>;
  roomItems: RoomItemType[];
}

export const RoomList: FC<IRoomList> = ({
  selectedRoomId,
  setSelectedRoomId,
  roomItems,
}) => {
  return (
    <div className="roomList">
      {/* Header */}
      <div className="roomList__header">
        <Typography variant="h6" sx={{ fontWeight: "400" }}>
          Messages
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

      {/* Filter */}
      <div className="roomList__filter">
        <div className="roomList__filterOptions">
          <Typography variant="body2">All rooms</Typography>
          <KeyboardArrowDownIcon />
        </div>

        <Typography variant="body2" color="gray">
          Mark all as read
        </Typography>
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
