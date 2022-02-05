import { HubConnectionBuilder } from "@microsoft/signalr";
import { Typography } from "@mui/material";
import { FC, useEffect, useCallback } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useRedirect } from "../../hooks/useRedirect";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectInboxes,
  addNewMessage,
  fetchInboxes,
  addNewInbox,
} from "../../redux/InboxesSlice";
import { selectUser } from "../../redux/UserSlice";
import { InboxItemType } from "../../typings/InboxItemType";
import { MessageType } from "../../typings/MessageType";
import "./Chat.css";
import NoInboxesOverlay from "../../assets/no_inboxes_overlay.svg";
import { Link } from "react-router-dom";

export const Chat: FC = () => {
  const { isFetching, inboxes } = useAppSelector(selectInboxes);
  const { user } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const { setPathnameHandler } = useRedirect();

  const createSignalRConnection = useCallback(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/chat`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        // Receive message event listener
        connection.on("ReceiveMessage", (message: MessageType) => {
          dispatch(
            addNewMessage({
              message,
            })
          );
        });

        // Receive inbox event listener
        connection.on("ReceiveInbox", (inbox: InboxItemType) => {
          const isJoinedInbox = inbox.memberIds.includes(user.userId);

          if (isJoinedInbox) {
            dispatch(
              addNewInbox({
                inbox,
              })
            );
          }
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    createSignalRConnection();
    dispatch(fetchInboxes());
    setPathnameHandler();
  }, []);

  return (
    <>
      {!isFetching && inboxes.length ? (
        <div className="chat">
          <div className="chat__inboxList">
            <InboxList />
          </div>
          <div className="chat__inboxMessages">
            <InboxMessages />
          </div>
        </div>
      ) : isFetching ? (
        <PageLoading />
      ) : (
        <div className="chat" style={{ backgroundColor: "#f1f2f5" }}>
          <div className="chat__overlay">
            <img src={NoInboxesOverlay} />
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              You have no inboxes, <Link to="/search">add</Link> some friends
              and start your conversation
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
