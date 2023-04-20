import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push(action.payload);
		},
		vote(state, action) {
			const id = action.payload;
			state = [...state.map((c) => (c.id === id ? { ...c, votes: ++c.votes } : c))];
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
		sort(state, action) {
			state = [...state.sort((a, b) => b.votes - a.votes)];
		},
	},
});

export const initialiseAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const addVote = (id) => {
	return async (dispatch) => {
		await anecdoteService.incrementVote(id);
		dispatch(vote(id));
		dispatch(sort());
	};
};

export const { addAnecdote, setAnecdotes, vote, sort } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
