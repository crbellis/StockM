import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface History {
	prevPath: string | null;
}

const initialState: History = {
	prevPath: null,
};

export const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		setHistory: (state, action) => {
			state.prevPath = action.payload.path;
		},
	},
});

export const { setHistory } = historySlice.actions;

export const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
