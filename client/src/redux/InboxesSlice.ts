import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../typings/MessageType";
import { InboxItemType } from "../typings/InboxItemType";
import { RootState } from "./store";

interface InboxesState {
  inboxes: InboxItemType[];
  selectedInboxId: string;
  isFetching: boolean;
  isCreating: boolean;
  isPreviewing: boolean;
  error: boolean;
}

interface UpdateDataOfInbox {
  message: MessageType;
}

interface PreviewMessage {
  previewMessage: MessageType;
}

const initialState: InboxesState = {
  inboxes: [],
  selectedInboxId: "",
  isFetching: true,
  isCreating: true,
  isPreviewing: false,
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

export const postInbox = createAsyncThunk(
  "inboxes/postInbox",
  async (inboxData: InboxItemType) => {
    const {
      data: { code, message, inbox },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/inbox/create`,
      inboxData,
      { withCredentials: true }
    );

    return {
      code,
      message,
      inbox,
    };
  }
);

export const inboxesSlice = createSlice({
  name: "inboxes",
  initialState,
  reducers: {
    changeSelectedInboxId: (state, action: PayloadAction<string>) => {
      state.selectedInboxId = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<UpdateDataOfInbox>) => {
      const { message } = action.payload;
      const existingInbox = state.inboxes.find(
        (inbox) => inbox.inboxId === message.inboxRefId
      );

      if (existingInbox) {
        existingInbox.messages?.push(message);
      }
    },
    showPreviewMessage: (state, action: PayloadAction<PreviewMessage>) => {
      const { previewMessage } = action.payload;
      const existingInbox = state.inboxes.find(
        (inbox) => inbox.inboxId === previewMessage.inboxRefId
      );
      if (existingInbox) {
        existingInbox.messages?.push(previewMessage);
        state.isPreviewing = true;
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
          state.selectedInboxId = sortedInboxes[0].inboxId; // Set default selected inbox id of the latest inbox

          if (state.inboxes.length) state.isFetching = false;
        }
      )
      .addCase(fetchInboxes.rejected, (state) => {
        state.error = true;
        state.inboxes = initialState.inboxes;
      })

      // Post inbox
      .addCase(postInbox.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(postInbox.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.inboxes.push(action.payload.inbox);
          state.inboxes
            .slice()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((inbox) => ({
              ...inbox,
              messages: inbox.messages
                ?.slice()
                .sort((a: any, b) => a.createdAt.localeCompare(b.createdAt)),
            }));
          state.isCreating = false;
        }
      })
      .addCase(postInbox.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { changeSelectedInboxId, addNewMessage, showPreviewMessage } =
  inboxesSlice.actions;
export const selectInboxes = (state: RootState) => state.inboxes;
export default inboxesSlice.reducer;
