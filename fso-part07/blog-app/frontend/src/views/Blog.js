const BlogView = ({ blog, like, canRemove, remove }) => {
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
		</div>
	);
};

export default BlogView;
