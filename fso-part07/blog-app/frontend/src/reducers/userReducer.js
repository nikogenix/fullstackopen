import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action) {
			const token = action.payload.token;
			const username = action.payload.username;
			const name = action.payload.name;
			return { token, username, name };
		},
		removeUser() {
			return null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
