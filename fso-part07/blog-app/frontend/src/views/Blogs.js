import Togglable from "../components/Togglable";
import NewBlog from "../components/NewBlog";
import Blog from "../components/Blog";

const BlogsView = ({ blogFormRef, createBlog, blogs, user, like, remove }) => {
	return (
		<div>
			<h2>blogs</h2>
			<Togglable buttonLabel="new note" ref={blogFormRef}>
				<NewBlog createBlog={createBlog} />
			</Togglable>
			<div>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						like={() => like(blog)}
						canRemove={user && blog.user.username === user.username}
						remove={() => remove(blog)}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogsView;
