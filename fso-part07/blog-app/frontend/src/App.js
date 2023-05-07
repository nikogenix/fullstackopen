/* eslint-disable */

import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from "react-router-dom";

import loginService from "./services/login";
import storageService from "./services/storage";
import commentsService from "./services/comments";

import UserView from "./views/User";
import UsersView from "./views/Users";
import BlogView from "./views/Blog";
import BlogsView from "./views/Blogs";
import LoginView from "./views/Login";

import Notification from "./components/Notification";

import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initialiseBlogs, createNewBlog, addLike, deleteBlog } from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import { initialiseUsers } from "./reducers/usersReducer";

import "./index.css";

const App = () => {
	const user = useSelector((state) => state.user);
	const users = useSelector((state) => state.users);
	const notification = useSelector((state) => state.notification);
	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();
	const blogFormRef = useRef();
	const [userDataLoaded, setUserDataLoaded] = useState(false);

	useEffect(() => {
		const user = storageService.loadUser();
		if (user) dispatch(setUser(user));
		setUserDataLoaded(true);
	}, []);

	useEffect(() => {
		dispatch(initialiseBlogs());
	}, []);

	useEffect(() => {
		dispatch(initialiseUsers());
	}, []);

	const navigate = useNavigate();

	const notifyWith = (message, type = "info", time = 3) => {
		dispatch(setNotification(message, type, time));
	};

	const login = async (username, password) => {
		try {
			const user = await loginService.login({ username, password });
			dispatch(setUser(user));
			storageService.saveUser(user);
			notifyWith("welcome!");
		} catch (e) {
			notifyWith("wrong username or password", "error");
		}
	};

	const logout = async () => {
		dispatch(removeUser());
		storageService.removeUser();
		notifyWith("logged out");
	};

	const createBlog = async (newBlog) => {
		try {
			await dispatch(createNewBlog(newBlog));
			blogFormRef.current.toggleVisibility();
			notifyWith(`a new blog '${newBlog.title}' by '${newBlog.author}' added`);
			navigate("/blogs");
		} catch (e) {
			notifyWith("blog submission failed. make sure to fill in all the fields", "error");
		}
	};

	const like = async (blog) => {
		try {
			const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
			await dispatch(addLike(blogToUpdate));
			notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
		} catch (e) {
			notifyWith("adding a like failed. blog might be removed. please refresh and try again", "error");
		}
	};

	const remove = async (blog) => {
		try {
			const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
			if (ok) {
				await dispatch(deleteBlog(blog));
				notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
				navigate("/blogs");
			}
		} catch (e) {
			notifyWith("blog deletion failed. blog might already be removed. please refresh and try again", "error");
		}
	};

	const addComment = async (blogId, comment) => {
		try {
			const request = await commentsService.create(blogId, comment);
			notifyWith(`comment added`);
			return request;
		} catch (e) {
			notifyWith("comment submission failed. make sure to fill in the field", "error");
		}
	};

	const userMatch = useMatch("/users/:id");
	const userData = users.find((user) => user.id === userMatch?.params?.id) ?? null;

	const blogMatch = useMatch("/blogs/:id");
	const blogData = blogs.find((blog) => blog.id === blogMatch?.params?.id) ?? null;

	const commentMatch = useMatch("/blogs/:id");
	const [commentsData, setCommentsData] = useState(null);

	useEffect(() => {
		if (commentMatch) {
			commentsService
				.getAll(commentMatch.params.id)
				.then((data) => setCommentsData(data))
				.catch((error) => console.log(error));
		} else {
			setCommentsData(null);
		}
	}, [commentMatch]);

	if (!userDataLoaded) {
		return <div>loading user data...</div>;
	}

	return (
		<div>
			<nav>
				<Link to="/blogs">blogs</Link>
				<Link to="/users"> users</Link>
				{user ? (
					<em>
						{user.name} logged in <button onClick={logout}>logout</button>
					</em>
				) : (
					<Link to="/login">login</Link>
				)}
			</nav>

			<Notification info={notification} />

			<Routes>
				<Route
					path="/blogs/:id"
					element={
						<BlogView
							blog={blogData}
							comments={commentsData}
							setComments={setCommentsData}
							addComment={addComment}
							like={() => like(blogData)}
							canRemove={user && blogData?.user?.username === user?.username}
							remove={() => remove(blogData)}
						/>
					}
				/>
				<Route
					path="/blogs"
					element={
						<BlogsView
							blogFormRef={blogFormRef}
							createBlog={createBlog}
							blogs={blogs}
							user={user}
							like={like}
							remove={remove}
						/>
					}
				/>
				<Route
					path="/users/:id"
					element={user ? <UserView user={userData} /> : <Navigate replace to="/login" />}
				/>
				<Route path="/users" element={user ? <UsersView users={users} /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginView login={login} />} />
				<Route path="/" element={<Navigate replace to="/blogs" />} />
			</Routes>
			<footer>blog app | 2023 </footer>
		</div>
	);
};

export default App;
