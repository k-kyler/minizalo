import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./InboxList.css";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InboxItem } from "./InboxItem";
import { CustomDialog } from "../CustomDialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeSelectedInboxId, selectInboxes } from "../../redux/InboxesSlice";
import { openDialog } from "../../redux/DialogSlice";
import { InboxItemType } from "../../typings/InboxItemType";

export const InboxList: FC = () => {
  const dispatch = useAppDispatch();

  const { selectedInboxId, inboxes } = useAppSelector(selectInboxes);

  const [inboxList, setInboxList] = useState<InboxItemType[]>([]);

  // Sort inbox list by its latest message
  const sortInboxesWhenNewMessageCome = () => {
    const sortedInboxes = [...inboxes].sort((a, b) => {
      let aMessages = a.messages as any;
      let bMessages = b.messages as any;

      if (aMessages.length && bMessages.length)
        return bMessages[bMessages.length - 1].createdAt.localeCompare(
          aMessages[aMessages.length - 1].createdAt
        );
    });

    setInboxList(sortedInboxes);
  };

  useEffect(() => {
    sortInboxesWhenNewMessageCome();
  }, [inboxes]);
  // End of sort inbox list by its latest message

  return (
    <div className="inboxList">
      {/* Header */}
      <div className="inboxList__header">
        <Typography variant="h6">Messages</Typography>

        <Tooltip title="Create new group">
          <IconButton
            onClick={() => dispatch(openDialog({ type: "create-group" }))}
          >
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Create group dialog */}
      <CustomDialog />

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
        {inboxList.map((room) => (
          <InboxItem
            key={room.inboxId}
            {...room}
            selectedInboxId={selectedInboxId}
            clickHandler={() =>
              dispatch(changeSelectedInboxId(room.inboxId as any))
            }
          />
        ))}
      </div>
    </div>
  );
};
