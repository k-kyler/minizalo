import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../typings/message.type";

interface MessageState {
  isCreating: boolean;
  error: boolean;
}

const initialState: MessageState = {
  isCreating: true,
  error: false,
};

export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (inputMessage: MessageType) => {
    const formData = new FormData();

    formData.append("uid", inputMessage.uid);
    formData.append("username", inputMessage.username);
    formData.append("avatar", inputMessage.avatar);
    formData.append("content", inputMessage.content);
    formData.append("type", inputMessage.type);
    formData.append("inboxRefId", inputMessage.inboxRefId);

    if (inputMessage.file) {
      formData.append("file", inputMessage.file, inputMessage.file.name);
    }

    const {
      data: { code, message },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/message/create`,
      formData,
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
          state.isCreating = false;
        }
      })
      .addCase(postMessage.rejected, (state) => {
        state.error = true;
      });
  },
});

export default messageSlice.reducer;
