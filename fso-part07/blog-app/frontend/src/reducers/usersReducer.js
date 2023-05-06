import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload;
		},
		sort(state) {
			// eslint-disable-next-line no-unused-vars
			state = [...state.sort((a, b) => b.blogs.length - a.blogs.length)];
		},
	},
});

export const initialiseUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll();
		dispatch(setUsers(users));
		dispatch(sort());
	};
};

export const { setUsers, sort } = usersSlice.actions;
export default usersSlice.reducer;
