import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initialiseBlogs, createNewBlog } from "./reducers/blogReducer";

import "./index.css";

const App = () => {
	const [user, setUser] = useState("");
	const notification = useSelector((state) => state.notification);
	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();
	const blogFormRef = useRef();

	useEffect(() => {
		const user = storageService.loadUser();
		setUser(user);
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
			setUser(user);
			storageService.saveUser(user);
			notifyWith("welcome!");
		} catch (e) {
			notifyWith("wrong username or password", "error");
		}
	};

	const logout = async () => {
		setUser(null);
		storageService.removeUser();
		notifyWith("logged out");
	};

	const createBlog = async (newBlog) => {
		notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
		dispatch(createNewBlog(newBlog));
		blogFormRef.current.toggleVisibility();
	};

	const like = async (blog) => {
		//const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
		//const updatedBlog = await blogService.update(blogToUpdate);
		notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
		//setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
	};

	const remove = async (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
		if (ok) {
			await blogService.remove(blog.id);
			notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
			//setBlogs(blogs.filter((b) => b.id !== blog.id));
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
