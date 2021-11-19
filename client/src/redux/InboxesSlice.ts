import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../typings/MessageType";
import { InboxItemType } from "../typings/InboxItemType";
import { RootState } from "./store";

interface InboxesState {
  inboxes: InboxItemType[];
  isFetching: boolean;
  error: boolean;
}

interface UpdateDataOfInbox {
  message: MessageType;
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
  reducers: {
    addNewMessage: (state, action: PayloadAction<UpdateDataOfInbox>) => {
      const { message } = action.payload;
      const existingInbox = state.inboxes.find(
        (inbox) => inbox.inboxId === message.inboxRefId
      );

      if (existingInbox) {
        existingInbox.messages?.push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inboxes
      .addCase(fetchInboxes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        fetchInboxes.fulfilled,
        (state, action: PayloadAction<InboxItemType[]>) => {
          state.isFetching = false;

          const sortedInboxes = action.payload
            .slice()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((inbox) => ({
              ...inbox,
              messages: inbox.messages
                ?.slice()
                .sort((a: any, b) => a.createdAt.localeCompare(b.createdAt)),
            }));

          state.inboxes = sortedInboxes;
        }
      )
      .addCase(fetchInboxes.rejected, (state) => {
        state.error = true;
        state.inboxes = initialState.inboxes;
      });
  },
});

export const { addNewMessage } = inboxesSlice.actions;
export const selectInboxes = (state: RootState) => state.inboxes;
export default inboxesSlice.reducer;
