import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push(action.payload);
		},
		addVote(state, action) {
			const id = action.payload;
			state = state.map((c) => (c.id === id ? { ...c, votes: ++c.votes } : c)).sort((a, b) => b.votes - a.votes);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
