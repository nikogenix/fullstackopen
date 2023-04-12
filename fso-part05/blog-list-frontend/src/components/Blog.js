const Blog = ({ blog }) => (
	<div>
		<a href={blog.url}>{blog.title}</a> {blog.author}
	</div>
);

export default Blog;
