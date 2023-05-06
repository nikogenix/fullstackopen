import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
	const style = {
		marginBottom: 2,
		padding: 5,
		borderStyle: "solid",
	};

	return (
		<div style={style} className="blog">
			<Link to={`/blogs/${blog.id}`}>{blog.title}</Link> written by {blog.author}
		</div>
	);
};

export default Blog;
