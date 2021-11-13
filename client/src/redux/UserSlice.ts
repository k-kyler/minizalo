import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserType } from "../typings/UserType";

const initialState: UserType = {
  userId: "",
  userName: "",
  avatar: "",
  email: "",
  createdAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInProcessing: (state, action: PayloadAction<UserType>) => {
      state = action.payload;
    },
  },
});

export const { signInProcessing } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
