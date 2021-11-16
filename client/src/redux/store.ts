import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import alertReducer from "./AlertSlice";
import inboxesReducer from "./InboxesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    inboxes: inboxesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, alert: AlertState, inboxes: InboxesState }
export type AppDispatch = typeof store.dispatch;
