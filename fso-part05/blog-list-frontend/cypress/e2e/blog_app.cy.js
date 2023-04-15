describe("Blog app", () => {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user1 = {
			name: "name1",
			username: "user1",
			password: "password1",
		};
		const user2 = {
			name: "name2",
			username: "user2",
			password: "password2",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user1);
		cy.request("POST", "http://localhost:3003/api/users/", user2);
		cy.visit("http://localhost:3000");
	});

	it("login page is shown", function () {
		cy.contains("login");
	});

	describe("login", function () {
		it("succeeds with correct credentials", function () {
			cy.contains("username").children("input").type("user1");
			cy.contains("password").children("input").type("password1");
			cy.contains("login").click();
			cy.contains("logged in as name1");
			cy.contains("correct credentials");
		});

		it("fails with wrong credentials", function () {
			cy.contains("username").children("input").type("wronguser");
			cy.contains("password").children("input").type("wrongpassword");
			cy.contains("login").click();
			cy.contains("wrong credentials")
				.should("have.css", "color", "rgb(119, 4, 4)")
				.and("have.css", "border-style", "solid");
		});
	});

	describe("when logged in", function () {
		beforeEach(function () {
			cy.login({ username: "user1", password: "password1" });
		});

		it("a blog can be created", function () {
			cy.contains("new").click();
			cy.contains("title").children("input").type("title1");
			cy.contains("author").children("input").type("author1");
			cy.contains("url").children("input").type("url1");
			cy.get("button[type=submit]").click();
			cy.contains("new blog added successfully");
			cy.contains("title1");
			cy.contains("author1");
		});

		describe("and when a blog exists", function () {
			beforeEach(function () {
				cy.createBlog({ title: "title1", author: "author1", url: "url1" });
			});

			it("it can be liked", function () {
				cy.contains("view").click();
				cy.contains("👍🏻").click();
				cy.contains("likes: 1");
			});

			it("and it can be removed by the user that submitted it", function () {
				cy.contains("view").click();
				cy.contains("remove").click();
				cy.contains("item removed successfully");
			});

			it("but it can't be removed by another user", function () {
				cy.contains("logout").click();
				cy.login({ username: "user2", password: "password2" });
				cy.contains("view").click();
				cy.contains("remove").should("not.exist");
			});
		});

		describe("and when multiple blogs exist", function () {
			beforeEach(function () {
				cy.createBlog({ title: "title1", author: "author1", url: "url1" });
				cy.createBlog({ title: "title2", author: "author2", url: "url2" });
				cy.contains("view").click();
				cy.contains("👍🏻").click();
				cy.contains("likes: 1");
				cy.contains("view").click();
				cy.contains("hide").click();
				cy.contains("👍🏻").click();
				cy.contains("likes: 1");
				cy.contains("👍🏻").click();
				cy.contains("likes: 2");
			});

			it("they are sorted based on likes", function () {
				cy.get(".blogs").children().eq(0).should("contain", "title2");
				cy.get(".blogs").children().eq(1).should("contain", "title1");
			});
		});
	});
});
