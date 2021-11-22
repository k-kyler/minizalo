import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FileState {
  path: string;
  isUploading: boolean;
  error: boolean;
}

const initialState: FileState = {
  path: "",
  isUploading: true,
  error: false,
};

export const uploadFile = createAsyncThunk(
  "file/upload",
  async (inputFormData: FormData) => {
    const {
      data: { code, message, path },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/upload`,
      inputFormData,
      { withCredentials: true }
    );

    return {
      code,
      message,
      path,
    };
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.path = action.payload.path;
          state.isUploading = false;
        }
      })
      .addCase(uploadFile.rejected, (state) => {
        state.error = true;
        state.path = initialState.path;
      });
  },
});

export default fileSlice.reducer;
