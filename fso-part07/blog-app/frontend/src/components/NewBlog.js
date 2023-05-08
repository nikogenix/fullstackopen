import { useState } from "react";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		await createBlog({ title, author, url });
	};

	return (
		<div style={{ margin: "10px 20px" }}>
			<h4>create a new blog</h4>

			<Form onSubmit={handleSubmit} style={{ width: "70vw", maxWidth: 500 }}>
				<Form.Group>
					<FloatingLabel className="mb-3" label="title" controlId="title">
						<Form.Control
							placeholder="title"
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</FloatingLabel>
				</Form.Group>

				<Form.Group>
					<FloatingLabel className="mb-3" label="author" controlId="author">
						<Form.Control
							placeholder="author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</FloatingLabel>
				</Form.Group>

				<Form.Group>
					<FloatingLabel className="mb-3" label="url" controlId="url">
						<Form.Control placeholder="url" value={url} onChange={({ target }) => setUrl(target.value)} />
					</FloatingLabel>
				</Form.Group>

				<Button variant="primary" type="submit">
					create
				</Button>
			</Form>
		</div>
	);
};

export default BlogForm;
