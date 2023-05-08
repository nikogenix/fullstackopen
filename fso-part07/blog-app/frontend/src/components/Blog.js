import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
	return (
		<Card variant="outlined">
			<CardContent className="blog">
				<Typography variant="h6">
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</Typography>
				<Typography color="text.secondary">written by {blog.author}</Typography>
			</CardContent>
		</Card>
	);
};

export default Blog;
