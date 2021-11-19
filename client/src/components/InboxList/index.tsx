import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import "./InboxList.css";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InboxItem } from "./InboxItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSelectedInboxId, selectInboxes } from "../../redux/InboxesSlice";

export const InboxList: FC = () => {
  const dispatch = useAppDispatch();

  const { selectedInboxId, inboxes } = useAppSelector(selectInboxes);

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
        {inboxes.map((room) => (
          <InboxItem
            key={room.inboxId}
            {...room}
            selectedInboxId={selectedInboxId}
            clickHandler={() => dispatch(changeSelectedInboxId(room.inboxId))}
          />
        ))}
      </div>
    </div>
  );
};
