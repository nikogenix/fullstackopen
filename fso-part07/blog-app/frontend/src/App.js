import { useEffect, useRef, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import "./index.css";
import NotificationContext from "./NotificationContext";
import UserContext from "./UserContext";

const App = () => {
	const queryClient = useQueryClient();

	const [user, userDispatch] = useContext(UserContext);
	const [notification, dispatch] = useContext(NotificationContext);

	const blogFormRef = useRef();

	useEffect(() => {
		const user = storageService.loadUser();
		userDispatch({ type: "SET", payload: { ...user } });
	}, []);

	const resultBlogs = useQuery("blogs", blogService.getAll, { refetchOnWindowFocus: false });

	const newBlogMutation = useMutation(blogService.create, {
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData("blogs");
			const updatedBlogs = [...blogs, newBlog];
			queryClient.setQueryData("blogs", updatedBlogs);
		},
	});

	const updateBlogMutation = useMutation(blogService.update, {
		onSuccess: (updatedBlog) => {
			const blogs = queryClient.getQueryData("blogs");
			const updatedBlogs = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
			queryClient.setQueryData("blogs", updatedBlogs);
		},
	});

	const removeBlogMutation = useMutation(blogService.remove, {
		onSuccess: (id) => {
			queryClient.invalidateQueries("blogs");
			const blogs = queryClient.getQueryData("blogs");
			const updatedBlogs = blogs.filter((b) => b.id !== id);
			queryClient.setQueryData("blogs", updatedBlogs);
		},
	});

	const notifyWith = (message, type = "info") => {
		dispatch({ type: "ADD", payload: { message, type } });

		setTimeout(() => {
			dispatch({ type: "REMOVE" });
		}, 3000);
	};

	const login = async (username, password) => {
		try {
			const user = await loginService.login({ username, password });
			userDispatch({ type: "SET", payload: { ...user } });
			storageService.saveUser(user);
			notifyWith("welcome!");
		} catch (e) {
			notifyWith("wrong username or password", "error");
		}
	};

	const logout = async () => {
		userDispatch({ type: "REMOVE" });
		storageService.removeUser();
		notifyWith("logged out");
	};

	const createBlog = (newBlog) => {
		newBlogMutation.mutate(newBlog);
		notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
		blogFormRef.current.toggleVisibility();
	};

	const like = (blog) => {
		const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
		updateBlogMutation.mutate(blogToUpdate);
		notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
	};

	const remove = async (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
		if (ok) {
			removeBlogMutation.mutate(blog.id);
			notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
		}
	};

	if (resultBlogs.isLoading) {
		return <div>loading data...</div>;
	}

	if (resultBlogs.isError) return <div>service not available due to server issues</div>;

	const blogs = resultBlogs.data;

	if (!user) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification info={notification} />
				<LoginForm login={login} />
			</div>
		);
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes;

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
				{blogs.sort(byLikes).map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						like={() => like(blog)}
						canRemove={user && blog.user?.username === user.username}
						remove={() => remove(blog)}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
