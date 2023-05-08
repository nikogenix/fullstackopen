import { useState } from "react";

import { Button, TextField } from "@mui/material";

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		await createBlog({ title, author, url });
	};

	return (
		<div>
			<h4>create a new blog</h4>

			<form onSubmit={handleSubmit}>
				<div>
					<TextField label="title" value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div>
					<TextField label="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div>
					<TextField label="url" value={url} onChange={({ target }) => setUrl(target.value)} />
				</div>
				<Button type="submit">create</Button>
			</form>
		</div>
	);
};

export default BlogForm;
