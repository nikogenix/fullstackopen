import { useState } from "react";

const BlogView = ({ blog, comments, setComments, addComment, like, canRemove, remove }) => {
	const [comment, setComment] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const newComment = { message: comment };
			const createdComment = await addComment(blog.id, newComment);
			setComment("");
			if (createdComment !== undefined) setComments([...comments, createdComment]);
		} catch (error) {
			console.error("failed to add comment: ", error);
		}
	};

	if (blog === null) return <div>no blog found</div>;
	return (
		<div>
			<h3>{blog.title}</h3> {canRemove && <button onClick={remove}>delete</button>}
			<p>written by {blog.author}</p>
			<p>
				<a href={blog.url}> {blog.url}</a>
			</p>
			<p>
				liked by {blog.likes} <button onClick={like}>like</button>
			</p>
			<p>added by {blog.user.name}</p>
			<h4>comments</h4>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						id="comment"
						placeholder="comment"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
				</div>
				<button type="submit">add comment</button>
			</form>
			{comments === null ? (
				<p>loading...</p>
			) : comments.length === 0 ? (
				<p>no comments yet</p>
			) : (
				<ul>
					{comments.map((comment) => (
						<li key={comment.id}>{comment.message}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default BlogView;
