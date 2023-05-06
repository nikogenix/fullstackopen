/* eslint-disable */

import { useEffect, useRef, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

import loginService from "./services/login";
import storageService from "./services/storage";

import UserView from "./views/User";
import UsersView from "./views/Users";
import BlogView from "./views/Blog";
import BlogsView from "./views/Blogs";
import LoginView from "./views/Login";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

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
		dispatch(setUser(user));
		setUserDataLoaded(true);
	}, []);

	useEffect(() => {
		dispatch(initialiseBlogs());
	}, []);

	useEffect(() => {
		dispatch(initialiseUsers());
	}, []);

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
		dispatch(createNewBlog(newBlog));
		blogFormRef.current.toggleVisibility();
		notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
	};

	const like = async (blog) => {
		const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
		dispatch(addLike(blogToUpdate));
		notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
	};

	const remove = async (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
		if (ok) {
			dispatch(deleteBlog(blog));
			notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
		}
	};

	if (!userDataLoaded) {
		return <div>loading user data...</div>;
	}

	return (
		<div>
			<div>
				<Link to="/blogs">blogs</Link>
				<Link to="/users"> users</Link>
				{user ? (
					<em>
						{user.name} logged in <button onClick={logout}>logout</button>
					</em>
				) : (
					<Link to="/login">login</Link>
				)}
			</div>
			<Notification info={notification} />
			<Routes>
				<Route path="/blogs/:id" element={<BlogView />} />
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
				<Route path="/users" element={user ? <UsersView users={users} /> : <Navigate replace to="/login" />} />
				<Route path="/users/:id" element={user ? <UsersView /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginView login={login} />} />
			</Routes>
			<footer>Blog app | 2023 </footer>
		</div>
	);
};

export default App;
