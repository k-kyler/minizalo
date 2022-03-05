import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { selectUser } from "redux/user.slice";
import { addNewInbox, addNewMessage } from "redux/inboxes.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { InboxItemType } from "typings/inbox-item.type";
import { MessageType } from "typings/message.type";

export const useSignalR = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectUser);

  const createSignalRConnection = () => {
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
          dispatch(
            addNewInbox({
              userId: user.userId,
              inbox,
            })
          );
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    createSignalRConnection();
  }, []);
};
