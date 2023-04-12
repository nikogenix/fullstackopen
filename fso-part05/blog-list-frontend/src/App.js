import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const Notification = ({ message, error }) => {
	if (message === null) {
		return null;
	}

	return <span className={error ? "error" : "notification"}>{message}</span>;
};

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlogTitle, setNewBlogTitle] = useState("");
	const [newBlogAuthor, setNewBlogAuthor] = useState("");
	const [newBlogUrl, setNewBlogUrl] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState([null, false]); // notification message; error: true/false

	useEffect(() => {
		if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("blogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.getAll().then((blogs) => setBlogs(blogs));
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
			blogService.getAll().then((blogs) => setBlogs(blogs));
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

	const handleTitleChange = (event) => {
		setNewBlogTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		setNewBlogAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		setNewBlogUrl(event.target.value);
	};

	const addBlog = (event) => {
		event.preventDefault();
		const blogObject = {
			title: newBlogTitle,
			author: newBlogAuthor,
			url: newBlogUrl,
		};

		blogService
			.create(blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog));
				setNewBlogTitle("");
				setNewBlogUrl("");
				setNotification(["new blog added successfully", false]);
				setTimeout(() => {
					setNotification([null, false]);
				}, 5000);
			})
			.catch((exception) => {
				setNotification(["submission failed; all fields are required", true]);
				setTimeout(() => {
					setNotification([null, false]);
				}, 5000);
			});
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const blogForm = () => (
		<div>
			<h1>create new</h1>
			<form onSubmit={addBlog}>
				<div>
					title
					<input value={newBlogTitle} onChange={handleTitleChange} />
				</div>
				<div>
					author
					<input value={newBlogAuthor} onChange={handleAuthorChange} />
				</div>
				<div>
					url
					<input value={newBlogUrl} onChange={handleUrlChange} />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);

	return (
		<div>
			<h1>welcome</h1>
			<Notification message={notification[0]} error={notification[1]} />
			{user === null && loginForm()}
			{user && (
				<div>
					<div>
						<p>
							<b>logged in as {user.name}</b>
						</p>
						<button onClick={handleLogout}>logout</button>
					</div>
					<div>{blogForm()}</div>
					<div>
						<h1>blogs</h1>
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
