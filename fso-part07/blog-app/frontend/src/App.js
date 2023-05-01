import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initialiseBlogs, createNewBlog, addLike, deleteBlog } from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";

import "./index.css";

const App = () => {
	const user = useSelector((state) => state.user);
	const notification = useSelector((state) => state.notification);
	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();
	const blogFormRef = useRef();

	useEffect(() => {
		const user = storageService.loadUser();
		dispatch(setUser(user));
	}, []);

	useEffect(() => {
		dispatch(initialiseBlogs());
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

	if (!user) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification info={notification} />
				<LoginForm login={login} />
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification info={notification} />
			<div>
				{user.name} logged in
				<button onClick={logout}>logout</button>
			</div>
			<Togglable buttonLabel="new note" ref={blogFormRef}>
				<NewBlog createBlog={createBlog} />
			</Togglable>
			<div>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						like={() => like(blog)}
						canRemove={user && blog.user.username === user.username}
						remove={() => remove(blog)}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
