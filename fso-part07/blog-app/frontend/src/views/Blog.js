import { useState } from "react";

import { Button, Card, CardContent, TextField, Typography } from "@mui/material";

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
		<Card>
			<CardContent>
				<Typography variant="h5" style={{ display: "inline-block" }}>
					{blog.title}
				</Typography>{" "}
				{canRemove && (
					<Button style={{ display: "inline-block" }} onClick={remove}>
						delete
					</Button>
				)}
				<p>written by {blog.author}</p>
				<p>
					<a href={blog.url}> {blog.url}</a>
				</p>
				<p>
					liked by {blog.likes} <Button onClick={like}>like</Button>
				</p>
				<p>added by {blog.user.name}</p>
				<h4>comments</h4>
				<form onSubmit={handleSubmit}>
					<div>
						<TextField
							label="comment"
							value={comment}
							onChange={({ target }) => setComment(target.value)}
						/>
					</div>
					<Button type="submit">add comment</Button>
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
			</CardContent>
		</Card>
	);
};

export default BlogView;
