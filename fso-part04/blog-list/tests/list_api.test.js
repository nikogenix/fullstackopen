const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_api");
const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});
	let b1 = new Blog(helper.initialBlogs[0]);
	await b1.save();
	let b2 = new Blog(helper.initialBlogs[1]);
	await b2.save();
});

const api = supertest(app);

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("the correct amount of blogs is returned", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("one of the blogs is titled 'abc'", async () => {
	const response = await api.get("/api/blogs");

	const titles = response.body.map((r) => r.title);
	expect(titles).toContain("abc");
});

test("the id property is 'id' instead of '_id'", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body[0].id).toBeDefined();
});

test("a valid new blog can be added", async () => {
	const newBlog = {
		title: "poiuy",
		author: "lkjhg",
		url: "www.mnbvc.com",
		likes: 20,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const updatedBlogs = await helper.blogsInDb();

	const titles = updatedBlogs.map((b) => b.title);

	expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1);
	expect(titles).toContain(newBlog.title);
});

test("when no amount of likes are defined, the blog will have 0 by default", async () => {
	const newBlog = {
		title: "poiuy",
		author: "lkjhg",
		url: "www.mnbvc.com",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();

	const likes = blogsAtEnd.find((n) => n.title === "poiuy").likes;

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	expect(likes).toBe(0);
});

test("when no title/author/url is defined, the blog will not be added", async () => {
	const newBlog1 = {
		likes: 5,
	};

	// const newBlog2 = {
	// 	author: "lkjhg",
	// };

	// const newBlog3 = {
	// 	url: "www.mnbvc.com",
	// };

	await api.post("/api/blogs").send(newBlog1).expect(400);

	// await api.post("/api/blogs").send(newBlog2).expect(400);

	// await api.post("/api/blogs").send(newBlog3).expect(400);

	const blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
	await mongoose.connection.close();
});
