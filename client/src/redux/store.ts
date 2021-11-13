import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState }
export type AppDispatch = typeof store.dispatch;
