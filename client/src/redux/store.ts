import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import alertReducer from "./AlertSlice";
import dialogReducer from "./DialogSlice";
import inboxesReducer from "./InboxesSlice";
import messageReducer from "./MessageSlice";
import fileReducer from "./FileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    dialog: dialogReducer,
    inboxes: inboxesReducer,
    message: messageReducer,
    file: fileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, alert: AlertState, dialog: DialogState, inboxes: InboxesState, message: MessageState, file: FileState }
export type AppDispatch = typeof store.dispatch;
