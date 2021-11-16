import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC, SetStateAction, Dispatch } from "react";
import "./InboxList.css";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InboxItem } from "./InboxItem";
import { InboxItemType } from "../../typings/InboxItemType";

interface IInboxList {
  selectedInboxId: string;
  setSelectedInboxId: Dispatch<SetStateAction<string>>;
  inboxItems: InboxItemType[];
}

export const InboxList: FC<IInboxList> = ({
  selectedInboxId,
  setSelectedInboxId,
  inboxItems,
}) => {
  return (
    <div className="inboxList">
      {/* Header */}
      <div className="inboxList__header">
        <Typography variant="h6">Messages</Typography>

        <Tooltip title="Create new group">
          <IconButton>
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Filter */}
      <div className="inboxList__filter">
        <div className="inboxList__filterOptions">
          <Typography variant="body2">All messages</Typography>
          <KeyboardArrowDownIcon />
        </div>

        <Typography variant="body2">Mark all as read</Typography>
      </div>

      {/* Inboxes */}
      <div className="inboxList__inboxes">
        {inboxItems.map((room) => (
          <InboxItem
            key={room.inboxId}
            {...room}
            selectedInboxId={selectedInboxId}
            clickHandler={() => setSelectedInboxId(room.inboxId)}
          />
        ))}
      </div>
    </div>
  );
};
