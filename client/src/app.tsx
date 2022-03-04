import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./app.style.css";
import { linkData } from "shared/link-data";
import { SignIn } from "pages/sign-in";
import { SignUp } from "pages/sign-up";
import { PrivateRoute } from "features/private-route";
import { CustomAlert, Navbar } from "features/ui";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchUser, selectUser } from "redux/user.slice";
import { selectIsOpen } from "redux/alert.slice";
import { addNewInbox, addNewMessage } from "redux/inboxes.slice";
import { InboxItemType } from "typings/inbox-item.type";
import { MessageType } from "typings/message.type";

function App() {
  const dispatch = useAppDispatch();

  const isAlertOpen = useAppSelector(selectIsOpen);
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
  };

  useEffect(() => {
    dispatch(fetchUser());
    createSignalRConnection();
  }, []);

  return (
    <div className="app">
      {/* General alert */}
      {isAlertOpen && <CustomAlert />}

      {/* Routes setup */}
      <Router>
        <Switch>
          {/* Private endpoints */}
          {linkData.map((link, index) => (
            <PrivateRoute
              key={index}
              exact
              path={link.pathname}
              component={() => (
                <>
                  <Navbar />
                  {link.Component}
                </>
              )}
            />
          ))}

          {/* Sign up endpoint */}
          <Route exact path="/signup">
            <SignUp />
          </Route>

          {/* Sign in endpoint */}
          <Route exact path="/">
            <SignIn />
          </Route>

          {/* Redirect back to dashboard if user gets into wrong routes */}
          <Redirect to="/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
