import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: { message: null, type: null },
	reducers: {
		addNotification(state, action) {
			const message = action.payload.message;
			const type = action.payload.type;
			return { message, type };
		},
		removeNotification() {
			return { message: null, type: null };
		},
	},
});

export const setNotification = (message, type, time) => {
	return async (dispatch) => {
		dispatch(addNotification({ message, type }));
		setTimeout(() => {
			dispatch(removeNotification());
		}, time * 1000);
	};
};

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
