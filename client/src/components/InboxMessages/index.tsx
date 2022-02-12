import { FC, useEffect, useRef, useState } from "react";
import "./InboxMessages.css";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { Overlay } from "./Overlay";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import FlipMove from "react-flip-move";
import { useAppSelector } from "../../redux/hooks";
import { selectInboxes } from "../../redux/InboxesSlice";
import { selectUser } from "../../redux/UserSlice";

export const InboxMessages: FC = () => {
  const { selectedInboxId, inboxes } = useAppSelector(selectInboxes);
  const { user } = useAppSelector(selectUser);

  const [openEmojiModal, setOpenEmojiModal] = useState(false);

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
        <Tooltip
          title={
            selectedInbox.type === "group"
              ? selectedInbox.name
              : selectedInbox.users &&
                selectedInbox.users.length &&
                selectedInbox.users[0].userId === user.userId
              ? selectedInbox.users[1].userName
              : selectedInbox.users &&
                selectedInbox.users.length &&
                selectedInbox.users[0].userId === user.userId
              ? selectedInbox.users[0].userName
              : ""
          }
        >
          <div className="inboxMessages__headerLeft">
            {selectedInbox.type === "group" ? (
              <Avatar
                src={`${import.meta.env.VITE_API_URL}/Resources/${
                  selectedInbox.background
                }`}
                alt={selectedInbox.name}
              />
            ) : (
              <>
                {selectedInbox.users && selectedInbox.users.length ? (
                  <>
                    {user.userId === selectedInbox.users[0].userId ? (
                      <Avatar
                        src={`${import.meta.env.VITE_API_URL}/Resources/${
                          selectedInbox.users[1].avatar
                        }`}
                        alt={selectedInbox.users[1].avatar}
                      />
                    ) : (
                      <Avatar
                        src={`${import.meta.env.VITE_API_URL}/Resources/${
                          selectedInbox.users[0].avatar
                        }`}
                        alt={selectedInbox.users[0].avatar}
                      />
                    )}
                  </>
                ) : null}
              </>
            )}

            <div className="inboxMessages__info">
              {selectedInbox.type === "group" ? (
                <Typography variant="h6">{selectedInbox.name}</Typography>
              ) : (
                <>
                  {selectedInbox.users && selectedInbox.users.length ? (
                    <>
                      {user.userId === selectedInbox.users[0].userId ? (
                        <Typography variant="h6">
                          {selectedInbox.users[1].userName}
                        </Typography>
                      ) : (
                        <Typography variant="h6">
                          {selectedInbox.users[0].userName}
                        </Typography>
                      )}
                    </>
                  ) : null}
                </>
              )}

              {selectedInbox.type === "group" ? (
                <Typography variant="caption">
                  <PersonOutlineIcon
                    fontSize="small"
                    sx={{ marginRight: "0.25rem" }}
                  />
                  {selectedInbox.memberIds.length} Members
                </Typography>
              ) : (
                <Typography variant="caption">
                  <TrendingUpOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "0.25rem" }}
                  />
                  Direct message
                </Typography>
              )}
            </div>
          </div>
        </Tooltip>

        <div className="inboxMessages__headerRight">
          {selectedInbox.type === "group" ? (
            <Tooltip title="Invite member">
              <IconButton sx={{ color: "#0b81ff" }}>
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip title="View media & files">
            <IconButton sx={{ color: "#0b81ff" }}>
              <BarChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search messages">
            <IconButton sx={{ color: "#0b81ff" }}>
              <ManageSearchIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Messages */}
      <ul
        className="inboxMessages__messages"
        ref={messagesEndRef}
        onClick={() => setOpenEmojiModal(false)}
      >
        {selectedInbox.messages?.length ? (
          <FlipMove leaveAnimation="fade">
            {selectedInbox.messages?.map((message) => (
              <Message key={message.messageId} {...message} />
            ))}
          </FlipMove>
        ) : (
          <Overlay selectedInbox={selectedInbox} />
        )}
      </ul>

      {/* Chat input */}
      <ChatInput
        openEmojiModal={openEmojiModal}
        setOpenEmojiModal={setOpenEmojiModal}
        selectedInboxId={selectedInbox.inboxId as any}
        selectedInboxType={selectedInbox.type}
      />
    </div>
  );
};
