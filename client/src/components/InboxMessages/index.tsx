import { FC, useEffect, useRef } from "react";
import "./InboxMessages.css";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FlipMove from "react-flip-move";
import { useAppSelector } from "../../redux/hooks";
import { selectInboxes } from "../../redux/InboxesSlice";

export const InboxMessages: FC = () => {
  const { selectedInboxId, inboxes } = useAppSelector(selectInboxes);

  const messagesEndRef = useRef<HTMLUListElement>(null);

  const selectedInbox = inboxes.filter(
    (inboxItem) => inboxItem.inboxId === selectedInboxId
  )[0];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [selectedInboxId, selectedInbox]);

  return (
    <div className="inboxMessages">
      {/* Header */}
      <div className="inboxMessages__header">
        <Tooltip title={selectedInbox.name}>
          <div className="inboxMessages__headerLeft">
            <Avatar alt={selectedInbox.name} src={selectedInbox.background} />

            <div className="inboxMessages__info">
              <Typography variant="h6">{selectedInbox.name}</Typography>

              {selectedInbox.type === "group" ? (
                <Typography variant="caption">
                  <PersonOutlineIcon
                    fontSize="small"
                    sx={{ marginRight: "0.25rem" }}
                  />
                  {selectedInbox.memberIds.length} Members
                </Typography>
              ) : (
                <Typography variant="caption">Direct message</Typography>
              )}
            </div>
          </div>
        </Tooltip>

        <div className="inboxMessages__headerRight">
          {selectedInbox.type === "group" ? (
            <Tooltip title="Invite member">
              <IconButton>
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip title="View media & files">
            <IconButton>
              <BarChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search messages">
            <IconButton>
              <ManageSearchIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Messages */}
      <ul className="inboxMessages__messages" ref={messagesEndRef}>
        <FlipMove leaveAnimation="fade">
          {selectedInbox.messages?.map((message) => (
            <Message key={message.messageId} {...message} />
          ))}
        </FlipMove>
      </ul>

      {/* Chat input */}
      <ChatInput
        selectedInboxId={selectedInbox.inboxId}
        selectedInboxType={selectedInbox.type}
      />
    </div>
  );
};
