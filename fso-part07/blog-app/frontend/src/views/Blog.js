import { useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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
			<Card.Body>
				{" "}
				<Card.Title style={{ display: "inline-block", marginRight: 5 }}>{blog.title} </Card.Title>
				{canRemove && (
					<Button size="sm" style={{ display: "inline", margin: 0 }} onClick={remove}>
						delete
					</Button>
				)}
				<Card.Subtitle>written by {blog.author}</Card.Subtitle>
				<Card.Link href={blog.url}> {blog.url}</Card.Link>
				<Card.Text>
					liked by {blog.likes}{" "}
					<Button size="sm" style={{ margin: 0 }} onClick={like}>
						👍
					</Button>
				</Card.Text>
				<Card.Text>added by {blog.user.name}</Card.Text>
			</Card.Body>

			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<FloatingLabel className="mb-3" label="comment" controlId="comment">
							<Form.Control
								placeholder="comment"
								value={comment}
								onChange={({ target }) => setComment(target.value)}
							/>
						</FloatingLabel>
					</Form.Group>

					<Button type="submit">add comment</Button>
				</Form>

				<Card.Title style={{ marginTop: 15 }}>comments</Card.Title>

				{comments === null ? (
					<Card.Title>loading...</Card.Title>
				) : comments.length === 0 ? (
					<Card.Title>no comments yet</Card.Title>
				) : (
					<ListGroup className="list-group-flush">
						{comments.map((comment) => (
							<ListGroup.Item key={comment.id}>{comment.message}</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Card.Body>
		</Card>
	);
};

export default BlogView;
