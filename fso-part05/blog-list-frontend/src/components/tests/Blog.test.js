import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";

describe("blog component", () => {
	let container; // eslint-disable-line
	const blog = {
		user: { name: "name", username: "username" },
		title: "title",
		author: "author",
		url: "url",
		likes: 5,
	};
	const handleLike = jest.fn();

	beforeEach(() => {
		container = render(<Blog blog={blog} handleLike={handleLike} />).container;
	});

	test("renders title and author, but url and likes are hidden by default", () => {
		const title = screen.findByText("title");
		const author = screen.findByText("author");
		const url = screen.queryByText("url");
		const likes = screen.queryByText(5);

		expect(title).toBeDefined();
		expect(author).toBeDefined();
		expect(url).not.toBeInTheDocument();
		expect(likes).not.toBeInTheDocument();
	});

	test("after clicking the 'view' button, the url and likes are displayed", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		const url = screen.queryByText("url");
		const likes = screen.queryByText(5);
		expect(url).toBeDefined();
		expect(likes).toBeDefined();
	});

	test("after the like button is clicked twice, the event handler is called twice", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		const likeButton = screen.getByText("👍🏻");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(handleLike).toHaveBeenCalledTimes(2);
	});
});
