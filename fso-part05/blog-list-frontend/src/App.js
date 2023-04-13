import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./index.css";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState([null, false]); // [0] notification message; [1] error: true/false
	const blogFormRef = useRef();

	useEffect(() => {
		if (user) blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
	}, [user]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("blogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("blogAppUser", JSON.stringify(user));
			setUser(user);
			setUsername("");
			setPassword("");
			blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
			setNotification(["correct credentials", false]);
			setTimeout(() => {
				setNotification([null, false]);
			}, 5000);
		} catch (exception) {
			setNotification(["wrong credentials", true]);
			setTimeout(() => {
				setNotification([null, false]);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("blogAppUser");
		setUser(null);
		setNotification(["logged out", false]);
		setTimeout(() => {
			setNotification([null, false]);
		}, 5000);
	};

	return (
		<div>
			<h1>welcome</h1>
			<Notification message={notification[0]} error={notification[1]} />
			{user === null && (
				<LoginForm
					handleLogin={handleLogin}
					setUsername={setUsername}
					setPassword={setPassword}
					username={username}
					password={password}
				/>
			)}
			{user && (
				<div>
					<div>
						<p>
							<b>logged in as {user.name}</b> <button onClick={handleLogout}>logout</button>
						</p>
					</div>
					<Togglable buttonLabel="new" ref={blogFormRef}>
						<BlogForm
							blogs={blogs}
							setBlogs={setBlogs}
							setNotification={setNotification}
							blogFormRef={blogFormRef}
						/>
					</Togglable>
					<div>
						<h1>blogs</h1>
						{blogs.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								blogs={blogs}
								setBlogs={setBlogs}
								setNotification={setNotification}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
