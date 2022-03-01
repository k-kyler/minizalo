import { FC } from "react";
import "./chat-screen-overlay.style.css";
import { Avatar, AvatarGroup, Typography } from "@mui/material";
import { InboxItemType } from "@typings/inbox-item.type";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { selectFriends } from "@redux/friends.slice";

interface IChatScreenOverlay {
  selectedInbox: InboxItemType;
}

export const ChatScreenOverlay: FC<IChatScreenOverlay> = ({
  selectedInbox,
}) => {
  const { user } = useAppSelector(selectUser);
  const { friends } = useAppSelector(selectFriends);

  const getGroupMembers = () => {
    // Get all friends data
    const receiverFriends = friends.map((friend) => ({
      userId: friend.receiverData.userId,
      userName: friend.receiverData.userName,
      avatar: friend.receiverData.avatar,
    }));
    const senderFriends = friends.map((friend) => ({
      userId: friend.senderData.userId,
      userName: friend.senderData.userName,
      avatar: friend.senderData.avatar,
    }));

    // Filter to get friends that are members of the group and remove duplicate members
    const returnMembers = new Set(); // Temporary Set object to store unique items
    const groupMembers = [...receiverFriends, ...senderFriends]
      .filter((member) => selectedInbox.memberIds.includes(member.userId))
      .filter((member) => {
        const isExistingInReturnMembers = returnMembers.has(member.userId);

        returnMembers.add(member.userId);

        return !isExistingInReturnMembers;
      });

    return groupMembers;
  };

  const groupMembers = getGroupMembers();

  return (
    <div className="chatScreenOverlay">
      {/* Image */}
      {selectedInbox.type === "group" ? (
        <AvatarGroup
          max={5}
          sx={{ mb: 1 }}
          className="chatScreenOverlay__groupAvatar"
        >
          {groupMembers.map((member) => (
            <Avatar
              key={member.userId}
              src={`${import.meta.env.VITE_API_URL}/Resources/${member.avatar}`}
              alt={member.userName}
            />
          ))}
        </AvatarGroup>
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
                  sx={{ width: 50, height: 50, mb: 1 }}
                />
              ) : (
                <Avatar
                  src={`${import.meta.env.VITE_API_URL}/Resources/${
                    selectedInbox.users[0].avatar
                  }`}
                  alt={selectedInbox.users[0].avatar}
                  sx={{ width: 50, height: 50, mb: 1 }}
                />
              )}
            </>
          ) : null}
        </>
      )}

      {/* Name */}
      {selectedInbox.type === "group" ? (
        <Typography variant="h6" gutterBottom>
          {selectedInbox.name}
        </Typography>
      ) : (
        <>
          {selectedInbox.users && selectedInbox.users.length ? (
            <>
              {user.userId === selectedInbox.users[0].userId ? (
                <Typography variant="h6" gutterBottom>
                  {selectedInbox.users[1].userName}
                </Typography>
              ) : (
                <Typography variant="h6" gutterBottom>
                  {selectedInbox.users[0].userName}
                </Typography>
              )}
            </>
          ) : null}
        </>
      )}

      {/* Description */}
      <Typography variant="body2">
        {selectedInbox.type === "personal"
          ? "You're friends on MiniZalo"
          : "Let's start new conversation with your friends"}
      </Typography>
    </div>
  );
};
