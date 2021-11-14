import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AlertState {
  message: string;
  isOpen?: boolean;
}

const initialState: AlertState = {
  message: "",
  isOpen: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.isOpen = true;
    },
    closeAlert: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;
export const selectMessage = (state: RootState) => state.alert.message;
export const selectIsOpen = (state: RootState) => state.alert.isOpen;
export default alertSlice.reducer;
