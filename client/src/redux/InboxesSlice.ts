import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InboxItemType } from "../typings/InboxItemType";
import { RootState } from "./store";
import axios from "axios";

interface InboxesState {
  inboxes: InboxItemType[];
  isFetching: boolean;
  error: boolean;
}

const initialState: InboxesState = {
  inboxes: [],
  isFetching: false,
  error: false,
};

export const fetchInboxes = createAsyncThunk(
  "inboxes/fetchInboxes",
  async () => {
    const {
      data: { inboxes },
    } = await axios.get(`${import.meta.env.VITE_API_URL}/api/inbox/user`, {
      withCredentials: true,
    });

    return inboxes;
  }
);

export const inboxesSlice = createSlice({
  name: "inboxes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInboxes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchInboxes.fulfilled, (state, action) => {
        state.isFetching = false;
        state.inboxes = action.payload;
      })
      .addCase(fetchInboxes.rejected, (state) => {
        state.error = true;
        state.inboxes = initialState.inboxes;
      });
  },
});

export const selectInboxes = (state: RootState) => state.inboxes;
export default inboxesSlice.reducer;
