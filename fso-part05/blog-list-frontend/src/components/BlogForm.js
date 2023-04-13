import { useState } from "react";
import PropTypes from "prop-types";

import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
	const [newBlogTitle, setNewBlogTitle] = useState("");
	const [newBlogAuthor, setNewBlogAuthor] = useState("");
	const [newBlogUrl, setNewBlogUrl] = useState("");

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
		blogFormRef.current.toggleVisibility();
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
				setNewBlogAuthor("");
				setNewBlogUrl("");
				setNotification(["new blog added successfully", false]);
				setTimeout(() => {
					setNotification([null, false]);
				}, 5000);
			})
			.catch(() => {
				setNotification(["submission failed; all fields are required", true]);
				setTimeout(() => {
					setNotification([null, false]);
				}, 5000);
			});
	};

	return (
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
};

BlogForm.propTypes = {
	blogs: PropTypes.array.isRequired,
	setBlogs: PropTypes.func.isRequired,
	setNotification: PropTypes.func.isRequired,
	blogFormRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default BlogForm;
