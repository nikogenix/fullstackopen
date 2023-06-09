import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		addBlog(state, action) {
			state.push(action.payload);
		},
		sort(state) {
			// eslint-disable-next-line no-unused-vars
			state = [...state.sort((a, b) => b.likes - a.likes)];
		},
		likeBlog(state, action) {
			state = [...state.map((c) => (c.id === action.payload.id ? { ...c, likes: ++c.likes } : c))];
		},
		removeBlog(state, action) {
			return [...state.filter((c) => c.id !== action.payload.id)];
		},
	},
});

export const initialiseBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogsService.getAll();
		dispatch(setBlogs(blogs));
		dispatch(sort());
	};
};

export const createNewBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogsService.create(content);
		dispatch(addBlog(newBlog));
	};
};

export const addLike = (content) => {
	return async (dispatch) => {
		await blogsService.update(content);
		dispatch(likeBlog(content));
		dispatch(sort());
	};
};

export const deleteBlog = (content) => {
	return async (dispatch) => {
		await blogsService.remove(content.id);
		dispatch(removeBlog(content));
	};
};

export const { setBlogs, addBlog, sort, likeBlog, removeBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
