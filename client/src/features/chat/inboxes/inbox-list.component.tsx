import { FC, useEffect, useState, lazy, Suspense } from "react";
import "./inbox-list.style.css";
import { IconButton, Tooltip, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CustomDialog } from "features/ui";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { changeSelectedInboxId, selectInboxes } from "redux/inboxes.slice";
import { openDialog } from "redux/dialog.slice";
import { InboxItemType } from "typings/inbox-item.type";

const InboxItem = lazy(() => import("./inbox-item.component"));

export const InboxList: FC = () => {
  const dispatch = useAppDispatch();

  const { selectedInboxId, inboxes } = useAppSelector(selectInboxes);

  const [inboxList, setInboxList] = useState<InboxItemType[]>([]);

  // Sort inbox list by its latest message
  const sortInboxesWhenNewMessageCome = () => {
    const sortedInboxes = [...inboxes].sort((a, b) => {
      let aMessages = a.messages as any;
      let bMessages = b.messages as any;

      if (aMessages?.length && bMessages?.length) {
        return bMessages[bMessages.length - 1].createdAt.localeCompare(
          aMessages[aMessages.length - 1].createdAt
        );
      }
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
          <Suspense key={room.inboxId} fallback={""}>
            <InboxItem
              {...room}
              selectedInboxId={selectedInboxId}
              clickHandler={() =>
                dispatch(changeSelectedInboxId(room.inboxId as any))
              }
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
