import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface DialogState {
  type: "create-group";
  isOpen?: boolean;
}

const initialState: DialogState = {
  type: "create-group",
  isOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogState>) => {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const selectDialog = (state: RootState) => state.dialog;
export default dialogSlice.reducer;
