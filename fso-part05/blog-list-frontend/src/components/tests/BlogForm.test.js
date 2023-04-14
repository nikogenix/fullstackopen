import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../BlogForm";

describe("blog form component", () => {
	let container; // eslint-disable-line
	const addBlog = jest.fn();

	beforeEach(() => {
		container = render(<BlogForm addBlog={addBlog} />).container;
	});

	test("calls the event handler with the right details", async () => {
		const title = screen.querySelector("#title");
		const author = screen.querySelector("#author");
		const url = screen.querySelector("#url");
		const button = screen.queryByText("create");

		const user = userEvent.setup();
		userEvent.type(title, "user types title");
		userEvent.type(author, "user types author");
		userEvent.type(url, "user types url");
		await user.click(button);

		expect(addBlog.mock.calls).toHaveLength(1);
		expect(addBlog.mock.calls[0][0].title).toBe("user types title");
		expect(addBlog.mock.calls[0][0].author).toBe("user types author");
		expect(addBlog.mock.calls[0][0].url).toBe("user types url");
	});
});
