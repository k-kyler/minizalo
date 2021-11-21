import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../typings/MessageType";

interface MessageState {
  message: MessageType;
  isCreating: boolean;
  error: boolean;
}

const initialState: MessageState = {
  message: {
    messageId: "",
    uid: "",
    username: "",
    avatar: "",
    content: "",
    createdAt: "",
    type: "text",
    inboxRefId: "",
  },
  isCreating: true,
  error: false,
};

export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (inputMessage: MessageType) => {
    const {
      data: { code, message },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/message/create`,
      inputMessage,
      { withCredentials: true }
    );

    return {
      code,
      message,
    };
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Post message
      .addCase(postMessage.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.message = action.payload.message;
          state.isCreating = false;
        }
      })
      .addCase(postMessage.rejected, (state) => {
        state.error = true;
        state.message = initialState.message;
      });
  },
});

export default messageSlice.reducer;
