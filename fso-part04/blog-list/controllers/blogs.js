const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 });
	response.json(blog);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const user = request.user;
	if (!user) {
		return response.status(401).json({ error: "only logged in users can add a new blog" });
	}

	const { title, author, url, likes } = request.body;
	const blog = new Blog({
		title,
		author,
		url,
		likes: likes ? likes : 0,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog.id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	const user = request.user;

	if (blog?.user?.toString() === user?.id?.toString()) {
		user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());
		await user.save();
		await blog.remove();
		response.status(204).end();
	} else {
		return response.status(401).json({
			error: "users can only delete their own blogs",
		});
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const { user, title, url, author, likes } = request.body;

	const blog = {
		user,
		title,
		url,
		author,
		likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
	response.status(204).json(updatedBlog);
});

module.exports = blogsRouter;
