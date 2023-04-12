const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./list_api");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

describe("testing user and blog actions", () => {
	let authToken = "";
	beforeEach(async () => {
		await User.deleteMany({});
		await Blog.deleteMany({});

		let passwordHash = await bcrypt.hash("secret1", 10);
		let user1 = new User({ username: "root1", name: "admin1", passwordHash });
		await user1.save();

		passwordHash = await bcrypt.hash("secret2", 10);
		let user2 = new User({ username: "root2", name: "admin2", passwordHash });
		await user2.save();

		let b1 = new Blog({ ...helper.initialBlogs[0], user: user1.id });
		await b1.save();
		let b2 = new Blog({ ...helper.initialBlogs[1], user: user2.id });
		await b2.save();

		const response = await api.post("/api/login").send({
			username: "root1",
			password: "secret1",
		});
		authToken = response.body.token;
	});

	test("user creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "nikogenix",
			name: "niko",
			password: "password1",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("user creation fails with proper status code and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "root1",
			name: "admin1",
			password: "secret1",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("expected `username` to be unique");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	});

	test("blogs are returned as json", async () => {
		const response = await api.get("/api/blogs").set("Authorization", `Bearer ${authToken}`);
		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toMatch(/application\/json/);
	});

	test("the correct amount of blogs is returned", async () => {
		const response = await api.get("/api/blogs").set("Authorization", `Bearer ${authToken}`);
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("one of the blogs is titled 'abc'", async () => {
		const response = await api.get("/api/blogs").set("Authorization", `Bearer ${authToken}`);

		const titles = response.body.map((r) => r.title);
		expect(titles).toContain("abc");
	});

	test("the id property is 'id' instead of '_id'", async () => {
		const response = await api.get("/api/blogs").set("Authorization", `Bearer ${authToken}`);

		expect(response.body[0].id).toBeDefined();
	});

	test("a valid new blog can be added", async () => {
		const newBlog = {
			title: "test",
			author: "me",
			url: "https://www.test.com",
			likes: 0,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${authToken}`)
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
			.set("Authorization", `Bearer ${authToken}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		const likes = blogsAtEnd.find((n) => n.title === "poiuy").likes;

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(likes).toBe(0);
	});

	test("when no title/author/url is defined, the blog will not be added", async () => {
		const newBlog = {
			likes: 5,
		};

		await api.post("/api/blogs").send(newBlog).set("Authorization", `Bearer ${authToken}`).expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("deleting works", async () => {
		const blogs = await helper.blogsInDb();
		const deleteId = blogs[0].id;

		await api.delete(`/api/blogs/${deleteId}`).set("Authorization", `Bearer ${authToken}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
	});

	test("updating works", async () => {
		const blogs = await helper.blogsInDb();
		const updateId = blogs[0].id;
		const newBlog = {
			title: "qwerty",
			url: "www.zxcvbn.com",
			likes: 11,
		};

		await api.put(`/api/blogs/${updateId}`).send(newBlog).set("Authorization", `Bearer ${authToken}`).expect(204);

		const updatedBlogs = await helper.blogsInDb();

		const updatedBlog = updatedBlogs.find((b) => b.title === "qwerty");

		expect(updatedBlogs).toHaveLength(helper.initialBlogs.length);
		expect(updatedBlog.likes).toBe(11);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
