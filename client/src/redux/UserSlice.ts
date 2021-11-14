import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserType } from "../typings/UserType";
import axios from "axios";

interface UserState {
  user: UserType;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: {
    userId: "",
    userName: "",
    avatar: "",
    email: "",
    createdAt: "",
  },
  isFetching: false,
  error: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/user`,
    { withCredentials: true }
  );

  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
