import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import alertReducer from "./AlertSlice";
import dialogReducer from "./DialogSlice";
import inboxesReducer from "./InboxesSlice";
import messageReducer from "./MessageSlice";
import friendsReducer from "./FriendsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    dialog: dialogReducer,
    inboxes: inboxesReducer,
    message: messageReducer,
    friends: friendsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, alert: AlertState, dialog: DialogState, inboxes: InboxesState, message: MessageState, friends: FriendsState }
export type AppDispatch = typeof store.dispatch;
