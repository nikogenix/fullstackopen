import Togglable from "../components/Togglable";
import NewBlog from "../components/NewBlog";
import Blog from "../components/Blog";

const BlogsView = ({ blogFormRef, createBlog, blogs }) => {
	return (
		<div>
			<h2 style={{ fontSize: 26 }}>blogs</h2>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<NewBlog createBlog={createBlog} />
			</Togglable>
			<div>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default BlogsView;
