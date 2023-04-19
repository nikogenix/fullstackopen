import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		addNotification(state, action) {
			const notification = action.payload;
			return notification;
		},
		removeNotification(state, action) {
			return "";
		},
	},
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
