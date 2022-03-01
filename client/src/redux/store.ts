import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import alertReducer from "./alert.slice";
import dialogReducer from "./dialog.slice";
import inboxesReducer from "./inboxes.slice";
import messageReducer from "./message.slice";
import friendsReducer from "./friends.slice";

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
