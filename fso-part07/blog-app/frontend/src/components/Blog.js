import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Blog = ({ blog }) => {
	return (
		<Card className="blog" style={{ padding: "5px 15px", margin: "10px 0px" }}>
			<Card.Title>
				<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
			</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">written by {blog.author}</Card.Subtitle>
		</Card>
	);
};

export default Blog;
