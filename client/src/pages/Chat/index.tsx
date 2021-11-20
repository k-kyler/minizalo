import { HubConnectionBuilder } from "@microsoft/signalr";
import { FC, useEffect } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectInboxes,
  addNewMessage,
  fetchInboxes,
} from "../../redux/InboxesSlice";
import "./Chat.css";

export const Chat: FC = () => {
  const { isFetching } = useAppSelector(selectInboxes);

  const dispatch = useAppDispatch();

  const createSignalRConnection = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/chat`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        // Receive message event listener
        connection.on("ReceiveMessage", (message) => {
          dispatch(
            addNewMessage({
              message,
            })
          );
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    createSignalRConnection();
    dispatch(fetchInboxes());
  }, []);

  return (
    <>
      {isFetching ? (
        <PageLoading />
      ) : (
        <div className="chat">
          {/* Inbox list */}
          <div className="chat__inboxList">
            <InboxList />
          </div>

          {/* Inbox messages */}
          <div className="chat__inboxMessages">
            <InboxMessages />
          </div>
        </div>
      )}
    </>
  );
};
