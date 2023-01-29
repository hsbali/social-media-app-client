import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAlert } from "../../interfaces/app/alert.interface";

const initialState: IAlert[] = [];

export const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<IAlert>) => {
      return [action.payload, ...state];
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAlert, removeAlert } = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlert = (state: RootState) => state.alerts;

export default alertSlice.reducer;
