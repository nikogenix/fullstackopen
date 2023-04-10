const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "abc",
		author: "def",
		url: "www.ghi.com",
		likes: 0,
	},
	{
		title: "qwerty",
		author: "asdfgh",
		url: "www.zxcvbn.com",
		likes: 10,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
