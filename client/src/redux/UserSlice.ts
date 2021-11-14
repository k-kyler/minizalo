import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserType } from "../typings/UserType";
import axios from "axios";

interface UserState {
  user: UserType;
  isFetching: boolean;
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
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/user`,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.user = action.payload;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
