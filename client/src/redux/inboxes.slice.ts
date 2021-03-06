import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "typings/message.type";
import { InboxItemType } from "typings/inbox-item.type";
import { RootState } from "./store";

interface InboxesState {
  inboxes: InboxItemType[];
  selectedInboxId: string;
  isFetching: boolean;
  isCreating: boolean;
  isPreviewing: boolean;
  error: boolean;
}

interface AddNewMessage {
  message: MessageType;
}

interface RemoveMessage {
  messageId?: string;
  inboxRefId: string;
}

interface AddNewInbox {
  userId: string;
  inbox: InboxItemType;
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
    const formData = new FormData();

    formData.append("name", inboxData.name);
    formData.append("background", inboxData.background);
    formData.append("type", inboxData.type);
    formData.append("ownerId", inboxData.ownerId);

    for (let i = 0; i < inboxData.memberIds.length; i++) {
      formData.append("memberIds", inboxData.memberIds[i] as any);
    }

    if (inboxData.file) {
      formData.append("file", inboxData.file, inboxData.file.name);
    }

    const {
      data: { code, message, inbox },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/inbox/create`,
      formData,
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
    changeIsPreviewing: (state, action: PayloadAction<boolean>) => {
      state.isPreviewing = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<AddNewMessage>) => {
      const { message } = action.payload;
      const existingInbox = state.inboxes.find(
        (inbox) => inbox.inboxId === message.inboxRefId
      );

      if (existingInbox && existingInbox.messages !== null) {
        existingInbox.messages?.push(message);
      } else if (existingInbox && existingInbox.messages === null) {
        existingInbox.messages = [];
        existingInbox.messages?.push(message);
      }
    },
    removeMessage: (state, action: PayloadAction<RemoveMessage>) => {
      const { messageId, inboxRefId } = action.payload;
      const existingInbox = state.inboxes.find(
        (inbox) => inbox.inboxId === inboxRefId
      );

      if (existingInbox) {
        existingInbox.messages = existingInbox.messages?.filter(
          (message) => message.messageId !== messageId
        );
      }
    },
    addNewInbox: (state, action: PayloadAction<AddNewInbox>) => {
      const { inbox, userId } = action.payload;
      const isJoinedInbox = inbox.memberIds.includes(userId);

      if (isJoinedInbox) {
        state.inboxes.unshift(inbox);
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
            .map((inbox) => ({
              ...inbox,
              messages: inbox.messages
                ?.slice()
                .sort((a: any, b) => a.createdAt.localeCompare(b.createdAt)),
            }))
            // Sort inbox list by its latest message or inbox created time
            .sort((a: any, b) => {
              let aMessages = a.messages;
              let bMessages = b.messages as any;

              if (aMessages.length && bMessages.length) {
                return bMessages[bMessages.length - 1].createdAt.localeCompare(
                  aMessages[aMessages.length - 1].createdAt
                );
              } else if (aMessages.length) {
                return a.createdAt.localeCompare(
                  aMessages[aMessages.length - 1].createdAt
                );
              } else if (bMessages.length) {
                return bMessages[bMessages.length - 1].createdAt.localeCompare(
                  a.createdAt
                );
              } else {
                let bInbox = { ...b } as any;
                return bInbox.createdAt.localeCompare(a.createdAt);
              }
            });

          if (sortedInboxes.length) {
            state.inboxes = sortedInboxes;
            state.selectedInboxId = sortedInboxes[0].inboxId as any; // Set default selected inbox id of the latest inbox
          }

          state.isFetching = false;
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
          state.isCreating = false;
        }
      })
      .addCase(postInbox.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  changeSelectedInboxId,
  changeIsPreviewing,
  addNewMessage,
  removeMessage,
  addNewInbox,
} = inboxesSlice.actions;
export const selectInboxes = (state: RootState) => state.inboxes;
export default inboxesSlice.reducer;
