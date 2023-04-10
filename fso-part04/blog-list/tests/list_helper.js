const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => blogs.reduce((acc, c) => acc + c.likes, 0);

const filterInfo = ({ title, author, likes }) => ({ title, author, likes });
const favouriteBlog = (blogs) =>
	blogs.length === 0 ? {} : filterInfo(blogs.slice().sort((a, b) => a.likes - b.likes)[blogs.length - 1]);

const mostBlogs = (blogs) => {
	const authors = {};
	const result = { author: null, blogs: null };
	blogs.forEach((blog) => {
		authors[blog.author] ? authors[blog.author]++ : (authors[blog.author] = 1);
		if (authors[blog.author] > result.blogs) {
			result.author = blog.author;
			result.blogs = authors[blog.author];
		}
	});
	return result;
};

const mostLikes = (blogs) => {
	const authors = {};
	const result = { author: null, likes: null };
	blogs.forEach((blog) => {
		authors[blog.author] ? (authors[blog.author] += blog.likes) : (authors[blog.author] = blog.likes);
		if (authors[blog.author] > result.likes) {
			result.author = blog.author;
			result.likes = authors[blog.author];
		}
	});
	return result;
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
};
