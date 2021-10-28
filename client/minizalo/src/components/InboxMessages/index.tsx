import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import "./InboxMessages.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { InboxItemType } from "../../typings/InboxItemType";
import { Message } from "./Message";
import { ChatInput } from "../ChatInput";

interface IInboxMessages {
  selectedInboxId: string;
  inboxItems: InboxItemType[];
}

export const InboxMessages: FC<IInboxMessages> = ({
  selectedInboxId,
  inboxItems,
}) => {
  const selectedInbox = inboxItems.filter(
    (inboxItem) => inboxItem.id === selectedInboxId
  )[0];

  return (
    <div className="inboxMessages">
      {/* Header */}
      <div className="inboxMessages__header">
        <Tooltip title={selectedInbox.name}>
          <div className="inboxMessages__headerLeft">
            <Avatar alt={selectedInbox.name} src={selectedInbox.background} />

            <div className="inboxMessages__info">
              <Typography variant="h6">{selectedInbox.name}</Typography>
              <Typography variant="caption">
                <PersonOutlineIcon
                  fontSize="small"
                  sx={{ marginRight: "0.25rem" }}
                />
                {selectedInbox.memberIds.length} Members
              </Typography>
            </div>
          </div>
        </Tooltip>

        <div className="inboxMessages__headerRight">
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
      <ul className="inboxMessages__messages">
        {selectedInbox.messages?.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </ul>

      {/* Chat input */}
      <ChatInput />
    </div>
  );
};
