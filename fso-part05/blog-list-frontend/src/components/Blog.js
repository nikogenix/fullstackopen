import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, setNotification }) => {
	const [detailsVisible, setDetailsVisible] = useState(false);

	const handleClick = () => setDetailsVisible(!detailsVisible);

	const handleLike = () => {
		const blogObject = {
			user: blog.user.id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		};
		blogService
			.addLike(blog.id, blogObject)
			.then((returnedBlog) => {
				setBlogs(
					blogs
						.filter((b) => b.id !== blog.id)
						.concat(returnedBlog)
						.sort((a, b) => b.likes - a.likes)
				);
			})
			.catch((exception) => {
				console.log(exception);
			});
	};

	const handleDelete = () => {
		if (window.confirm(`are you sure you want to remove the blog "${blog.title}"?`)) {
			blogService
				.remove(blog.id)
				.then(() => {
					setBlogs(blogs.filter((b) => b.id !== blog.id));
					setNotification(["item removed successfully", false]);
					setTimeout(() => {
						setNotification([null, false]);
					}, 5000);
				})
				.catch(() => {
					setNotification([
						"deletion failed. item might already be removed. users can only delete their own blogs.",
						true,
					]);
					setTimeout(() => {
						setNotification([null, false]);
					}, 5000);
				});
		}
	};
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const briefListItem = () => (
		<>
			<p>
				<a href={blog.url}>{blog.title}</a> written by {blog.author} <button onClick={handleClick}>view</button>
			</p>
		</>
	);

	const detailedListItem = () => (
		<>
			<p>
				<a href={blog.url}>{blog.title}</a> written by {blog.author} <button onClick={handleClick}>hide</button>
			</p>
			<p>url: {blog.url}</p>
			<p>
				likes: {blog.likes} <button onClick={handleLike}>👍🏻</button>
			</p>
			<p>submitted by: {blog.user.name}</p>
			<button onClick={handleDelete} style={{ margin: 5 }}>
				remove
			</button>
		</>
	);

	return (
		<div style={blogStyle}>
			{!detailsVisible && briefListItem()}
			{detailsVisible && detailedListItem()}
		</div>
	);
};

export default Blog;
