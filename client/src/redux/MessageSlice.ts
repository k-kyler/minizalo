import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../typings/MessageType";

interface MessageState {
  message: MessageType;
  isFetching: boolean;
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
  isFetching: false,
  error: false,
};

export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (inputMessage: MessageType) => {
    const {
      data: { message },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/message/create`,
      inputMessage,
      { withCredentials: true }
    );

    return message;
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(postMessage.rejected, (state) => {
        state.error = true;
        state.message = initialState.message;
      });
  },
});

export default messageSlice.reducer;
